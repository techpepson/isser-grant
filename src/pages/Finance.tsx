import { Helmet } from "react-helmet-async";

export default function Finance() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Finance | Research Management Portal</title>
        <meta name="description" content="Financial overview of budgets, disbursements, and expenses." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="finance-heading" className="space-y-4">
        <h1 id="finance-heading" className="text-3xl font-semibold tracking-tight">Finance</h1>
        <p className="text-muted-foreground">Budgets and transactions overview.</p>
      </section>
    </>
  );
}
