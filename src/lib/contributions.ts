import { z } from "zod";

/** Re-fetch the calendar at most once a day. */
const revalidate = 60 * 60 * 24;

const day = z.object({
  date: z.iso.date(),
  count: z.number().int().nonnegative(),
  /** GitHub's own 0 to 4 bucket for the day. */
  level: z.literal([0, 1, 2, 3, 4]),
});

/** A year of days, oldest first. Both sources normalize to this. */
const calendarSchema = z.array(day).min(300).max(371);

export type ContributionDay = z.infer<typeof day>;

/** GraphQL names the buckets. The index is the level. */
const graphqlLevels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"] as const;

const graphqlResponse = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  date: z.iso.date(),
                  contributionCount: z.number(),
                  contributionLevel: z.enum(graphqlLevels),
                }),
              ),
            }),
          ),
        }),
      }),
    }),
  }),
});

const query = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

/** The GraphQL API. Needs a token with no scopes. */
async function fromGraphql(login: string, token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login } }),
    next: { revalidate },
  });
  if (!response.ok) throw new Error(`GraphQL responded ${response.status}`);
  const { weeks } = graphqlResponse.parse(await response.json()).data.user.contributionsCollection.contributionCalendar;
  return weeks.flatMap(({ contributionDays }) =>
    contributionDays.map(({ date, contributionCount, contributionLevel }) => ({
      date,
      count: contributionCount,
      level: graphqlLevels.indexOf(contributionLevel),
    })),
  );
}

/**
 * The public calendar fragment that github.com renders on profiles. Each day is a
 * `<td class="ContributionCalendar-day" data-date data-level id>`, and its count sits in a
 * `<tool-tip for="{id}">` as "N contributions on …" or "No contributions on …".
 */
async function fromHtml(login: string) {
  const response = await fetch(`https://github.com/users/${login}/contributions`, { next: { revalidate } });
  if (!response.ok) throw new Error(`Calendar page responded ${response.status}`);
  const html = await response.text();

  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const count = text?.match(/^([\d,]+) contributions? on/)?.[1];
    if (id) counts.set(id, count ? Number(count.replaceAll(",", "")) : 0);
  }

  const attribute = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  return [...html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)]
    .map(([tag]) => ({
      date: attribute(tag, "data-date"),
      count: counts.get(attribute(tag, "id") ?? ""),
      level: Number(attribute(tag, "data-level")),
    }))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
}

/**
 * Simon's public GitHub contributions for the last year, cached for a day. Uses the GraphQL API
 * when `GITHUB_TOKEN` is set, the public calendar page otherwise. Returns null, with a build
 * warning, when neither yields a valid calendar.
 */
export async function getContributions(login: string) {
  const token = process.env.GITHUB_TOKEN;
  const sources = [
    ...(token ? [{ name: "GraphQL API", load: () => fromGraphql(login, token) }] : []),
    { name: "calendar page", load: () => fromHtml(login) },
  ];

  for (const { name, load } of sources) {
    try {
      return calendarSchema.parse(await load());
    } catch (error) {
      console.warn(`[heatmap] The ${name} failed:`, error);
    }
  }
  console.warn("[heatmap] No contribution data; the Shipping section is hidden.");
  return null;
}
