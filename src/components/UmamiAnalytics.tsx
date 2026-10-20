import Script from "next/script";

export default function UmamiAnalytics() {
  const baseUrl = process.env.NEXT_PUBLIC_UMAMI_BASE_URL?.trim();
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  // recorder.js controls both session replay and heatmaps.
  const enableReplayAndHeatmaps =
    process.env.NEXT_PUBLIC_UMAMI_ENABLE_REPLAY_AND_HEATMAPS === "true";

  if (!baseUrl || !websiteId) return null;

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

  return (
    <>
      <Script
        src={`${normalizedBaseUrl}/script.js`}
        data-website-id={websiteId}
        strategy="afterInteractive"
        defer
      />
      {enableReplayAndHeatmaps && (
        <Script
          src={`${normalizedBaseUrl}/recorder.js`}
          data-website-id={websiteId}
          strategy="afterInteractive"
          defer
        />
      )}
    </>
  );
}
