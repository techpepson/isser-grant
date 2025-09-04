import { Helmet } from "react-helmet-async";

export default function Calls() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Funding Calls | Research Management Portal</title>
        <meta name="description" content="View active and upcoming funding calls with key details and deadlines." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="calls-heading" className="space-y-4">
        <h1 id="calls-heading" className="text-3xl font-semibold tracking-tight">Funding Calls</h1>
        <p className="text-muted-foreground">Explore current and upcoming calls.</p>
      </section>
    </>
  );
}
