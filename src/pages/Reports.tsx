import { Helmet } from "react-helmet-async";

export default function Reports() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Reports | Research Management Portal</title>
        <meta name="description" content="Generate and review technical and financial reports." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="reports-heading" className="space-y-4">
        <h1 id="reports-heading" className="text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">All project reports in one place.</p>
      </section>
    </>
  );
}
