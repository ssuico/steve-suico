# Contact form: move from EmailJS to Resend

**Date:** 2026-10-27
**Status:** accepted
**Author:** collaborative

## Context

The contact form in `src/views/contact/Contact.tsx` sends through EmailJS from the browser. It needs three `VITE_EMAILJS_*` variables baked in at build time. When any is missing, the form shows "The form is not configured yet" and no mail is sent. The variables are not listed in `.env.example`, and the form is not working in production.

The owner has the domain `ssuico.com` at Namecheap. Namecheap Email Forwarding is active on the root domain (MX `eforward1-5.registrar-servers.com`, SPF `include:spf.efwd.registrar-servers.com`). `contact@ssuico.com` and a catch-all both forward to `ssuico78@gmail.com`. There is no DMARC record.

Related: [GitHub contribution heatmap](./2026-10-14-github-contribution-heatmap.md) set the pattern of a Vercel function plus a matching Vite dev middleware, with secrets kept server-side.

## Decision

- Send contact mail with Resend from a Vercel function at `/api/contact` (`api/contact.ts`). The Vite dev server exposes the same route. The API key never reaches the browser.
- The function validates the input (name, email, message, length caps), keeps the existing honeypot field, and escapes all visitor text before putting it in HTML. It checks the SDK's `{ data, error }` result and logs the email ID or the error.
- Mail goes to `CONTACT_TO_EMAIL` and is sent from `CONTACT_FROM_EMAIL`. `reply_to` is the visitor's address so a reply goes straight to them.
- Sending domain: `mail.ssuico.com`, with sender `Portfolio Contact <contact@mail.ssuico.com>`. A subdomain keeps Resend's MX, SPF and DKIM records separate from Namecheap forwarding on the root domain, so `contact@ssuico.com` forwarding keeps working.
- Receiving is not enabled in Resend, because inbound MX records would clash with Namecheap forwarding.
- A DMARC record (`_dmarc.ssuico.com`) is added with `p=none` to start monitoring.
- The API key is a sending-only key restricted to the domain. It is stored as `RESEND_API_KEY` in `.env` locally and in Vercel project settings.
- Until the domain verifies, `CONTACT_FROM_EMAIL` falls back to `onboarding@resend.dev`, which can deliver only to the Resend account owner's address.
- Remove `emailjs-com` and the `VITE_EMAILJS_*` variables.

## Alternatives Considered

- Fixing the EmailJS variables. Rejected because the public key and template stay in the browser bundle, the service has no domain-level deliverability controls, and the owner asked for Resend.
- Calling Resend from the browser. Rejected because the API key would be public.
- Sending from the root domain. Rejected because it risks interfering with Namecheap forwarding records.
- Resend inbox or receiving on the domain. Rejected for now because it conflicts with existing forwarding and is not needed for a notification form.

## Consequences

- Production needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` set in Vercel, then a redeploy.
- DNS records for `mail.ssuico.com` must be added by hand in Namecheap Advanced DNS and verified in Resend. Propagation can take minutes to hours.
- The form no longer works through plain `vite preview` or a static host, because it needs the `/api/contact` function. `yarn dev` and Vercel both serve it.
- There is no rate limiting beyond the honeypot. If spam appears, add rate limiting or a CAPTCHA in a follow-up entry.
