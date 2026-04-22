import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";

export async function handleStatsApi(req, res) {
  // If credentials aren't set, return a 503 explaining what to do
  if (
    !process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    !process.env.GA4_PROPERTY_ID
  ) {
    res.writeHead(503, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(
      JSON.stringify({
        error: {
          message:
            "Missing GOOGLE_APPLICATION_CREDENTIALS or GA4_PROPERTY_ID in environment.",
        },
      }),
    );
  }

  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    const analyticsDataClient = new BetaAnalyticsDataClient();

    // 1. Fetch Conversion to Tools (e.g. users who triggered 'tool_click' event)
    const [conversionResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "eventCount" }],
      dimensions: [{ name: "eventName" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            value: "tool_click",
          },
        },
      },
    });

    const toolClicks =
      conversionResponse.rows?.length > 0
        ? parseInt(conversionResponse.rows[0].metricValues[0].value, 10)
        : 0;

    // 2. Fetch Average Engagement Time and Returning Visitor Rate
    const [engagementResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "averageSessionDuration" },
        { name: "newUsers" },
        { name: "totalUsers" },
      ],
    });

    let avgSessionDuration = "0s";
    let returningVisitorRate = "0%";

    if (engagementResponse.rows?.length > 0) {
      const metrics = engagementResponse.rows[0].metricValues;
      const durationSeconds = parseFloat(metrics[0].value);
      avgSessionDuration =
        durationSeconds > 60
          ? `${Math.floor(durationSeconds / 60)}m ${Math.round(
              durationSeconds % 60,
            )}s`
          : `${Math.round(durationSeconds)}s`;

      const newUsers = parseInt(metrics[1].value, 10);
      const totalUsers = parseInt(metrics[2].value, 10);
      if (totalUsers > 0) {
        const returningUsers = totalUsers - newUsers;
        returningVisitorRate = `${Math.round(
          (returningUsers / totalUsers) * 100,
        )}%`;
      }
    }

    // 3. Top Landing Pages (Search Console)
    let topLandingPages = [];
    if (process.env.GSC_SITE_URL) {
      const auth = new google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
      });
      const authClient = await auth.getClient();
      const webmasters = google.webmasters({ version: "v3", auth: authClient });

      const gscResponse = await webmasters.searchanalytics.query({
        siteUrl: process.env.GSC_SITE_URL,
        requestBody: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          dimensions: ["page"],
          rowLimit: 5,
        },
      });

      topLandingPages = (gscResponse.data.rows || []).map((row) => ({
        url: row.keys[0],
        clicks: row.clicks,
      }));
    }

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        conversionToTools: toolClicks.toString(),
        averageEngagementTime: avgSessionDuration,
        returningVisitorRate: returningVisitorRate,
        topLandingPages: topLandingPages,
      }),
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        error: { message: "Failed to fetch stats from Google APIs" },
      }),
    );
  }
}
