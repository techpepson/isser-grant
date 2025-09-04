import { Helmet } from "react-helmet-async";

export default function Applications() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Applications | Research Management Portal</title>
        <meta name="description" content="Track grant applications, statuses, and submission details." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="applications-heading" className="space-y-4">
        <h1 id="applications-heading" className="text-3xl font-semibold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">Monitor and manage submissions.</p>
      </section>
    </>
  );
}
