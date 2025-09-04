import { Helmet } from "react-helmet-async";

export default function Researchers() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Researchers | Research Management Portal</title>
        <meta name="description" content="Browse and manage researcher profiles, affiliations, and activity." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="researchers-heading" className="space-y-4">
        <h1 id="researchers-heading" className="text-3xl font-semibold tracking-tight">Researchers</h1>
        <p className="text-muted-foreground">Manage and view researcher profiles.</p>
      </section>
    </>
  );
}
