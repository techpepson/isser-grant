import { Helmet } from "react-helmet-async";

export default function Awards() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Awards | Research Management Portal</title>
        <meta name="description" content="Review awarded projects, funding amounts, and progress." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="awards-heading" className="space-y-4">
        <h1 id="awards-heading" className="text-3xl font-semibold tracking-tight">Awards</h1>
        <p className="text-muted-foreground">Active and completed awards overview.</p>
      </section>
    </>
  );
}
