import { Helmet } from "react-helmet-async";

export default function Settings() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Settings | Research Management Portal</title>
        <meta name="description" content="Configure organization preferences and app settings." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="settings-heading" className="space-y-4">
        <h1 id="settings-heading" className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Application configuration.</p>
      </section>
    </>
  );
}
