const GITHUB_LOGIN = 'ssuico'
const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

const CONTRIBUTION_LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
] as const

export type ContributionLevel = (typeof CONTRIBUTION_LEVELS)[number]

export type ContributionDay = {
  date: string
  weekday: number
  count: number
  level: ContributionLevel
}

export type ContributionCalendar = {
  total: number
  months: { name: string; year: number; totalWeeks: number }[]
  weeks: { firstDay: string; days: ContributionDay[] }[]
}

type CalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          months: { name: string; year: number; totalWeeks: number }[]
          weeks: {
            firstDay: string
            contributionDays: {
              date: string
              weekday: number
              contributionCount: number
              contributionLevel: string
            }[]
          }[]
        }
      }
    } | null
  }
  errors?: { message: string }[]
}

const QUERY = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months {
            name
            year
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

function isLevel(value: string): value is ContributionLevel {
  return (CONTRIBUTION_LEVELS as readonly string[]).includes(value)
}

export async function fetchContributionCalendar(token: string): Promise<ContributionCalendar> {
  const response = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'steve-suico-portfolio',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { login: GITHUB_LOGIN },
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub responded with ${response.status}`)
  }

  const payload = (await response.json()) as CalendarResponse
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar || payload.errors?.length) {
    const message = payload.errors?.map((error) => error.message).join('; ')
    throw new Error(message || 'GitHub did not return a contribution calendar')
  }

  return {
    total: calendar.totalContributions,
    months: calendar.months.map((month) => ({
      name: month.name,
      year: month.year,
      totalWeeks: month.totalWeeks,
    })),
    weeks: calendar.weeks.map((week) => ({
      firstDay: week.firstDay,
      days: week.contributionDays.map((day) => ({
        date: day.date,
        weekday: day.weekday,
        count: day.contributionCount,
        level: isLevel(day.contributionLevel) ? day.contributionLevel : 'NONE',
      })),
    })),
  }
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return Response.json({ error: 'GitHub token is not configured.' }, { status: 500 })
  }

  try {
    const calendar = await fetchContributionCalendar(token)
    return Response.json(calendar, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Contribution calendar request failed')
    return Response.json(
      { error: 'GitHub contributions are unavailable right now.' },
      { status: 502 },
    )
  }
}
