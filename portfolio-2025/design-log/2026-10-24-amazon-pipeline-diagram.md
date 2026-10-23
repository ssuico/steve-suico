# Pipeline diagram as the cover for the Amazon API Data Platform

**Date:** 2026-10-24
**Status:** accepted
**Author:** collaborative

## Context

Four of the five projects have a screenshot cover. The Amazon API Data Platform has none, because it is a backend system with no public interface. [2026-10-14-project-cover-images](2026-10-14-project-cover-images.md) left it on the gradient placeholder. After the [visual system refresh](2026-10-23-visual-system-refresh.md) the placeholder is a dark card with the word "WORK", which reads as a failed image to a visitor.

The project is deployed on Google Cloud, and the architecture is the thing worth showing.

## Decision

- Draw the platform as an inline SVG, `PipelineDiagram`, and use it as that project's cover on the card and on the case-study banner. No image file and no dependency.
- A project opts in with a new optional field, `art: 'amazon-pipeline'`. A cover image still wins if both are set. Without either, the gradient placeholder remains.
- A small `ProjectArt` component picks between cover image, diagram, and placeholder so the card and the case study do not each repeat that logic.
- The diagram shows the flow left to right:
  - **Amazon** SP-API and Ads API as sources.
  - Inside a **Google Cloud** boundary: Cloud Scheduler starts runs, Cloud Tasks queues the work, a Cloud Run service (FastAPI) ingests, BigQuery stores, and a second Cloud Run service (FastAPI) serves the data.
  - A **Cloud Build** lane builds the Docker images and deploys both Cloud Run services (dashed).
  - **Consumers** on the right: Obseron and Delos (through MCP), both already described on their own case studies.
- Data-flow lines animate with a moving dash; the animation is off under `prefers-reduced-motion`. The SVG has an accessible name that states the flow in words.

## What is stated and what is inferred

Stated in the existing project data: Amazon SP-API and Ads API ingestion, scheduled ingestion, FastAPI in front of the cloud data store, BigQuery, Docker, and Cloud Build for deploys. Obseron and Delos are described as using these pipelines.

Inferred from the skills list (Cloud Run, Cloud Tasks, Cloud Schedulers) and not stated for this project: that Cloud Scheduler triggers Cloud Tasks, that Cloud Tasks calls the ingestion service, and that both services run on Cloud Run. If the real wiring differs, change the nodes and arrows in `PipelineDiagram.tsx`. No service outside those named above (for example Pub/Sub, Cloud Storage, or Secret Manager) is drawn, because nothing in the repo says it is used.

## Alternatives Considered

- A static PNG exported from a diagramming tool. Rejected: it would be another heavy image to load, cannot follow the theme, and cannot animate or be read by a screen reader.
- A Mermaid diagram rendered at runtime. Rejected: adds a large dependency for one picture and gives less control over how it looks at card size.
- Leaving the gradient. Rejected: it looks like a missing image.

## Consequences

- The diagram makes a claim about architecture. It should be checked against how the platform is actually wired before it is relied on in an interview or with a client.
- The card is small, so node labels are short and detail lives in the case-study text.
- Adding diagrams for other projects means adding a key to `art` and a component for it.
