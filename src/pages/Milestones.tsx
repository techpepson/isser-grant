import { Helmet } from "react-helmet-async";

export default function Milestones() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Milestones | Research Management Portal</title>
        <meta name="description" content="Track project milestones, progress, and due dates." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="milestones-heading" className="space-y-4">
        <h1 id="milestones-heading" className="text-3xl font-semibold tracking-tight">Milestones</h1>
        <p className="text-muted-foreground">Project milestones and timelines.</p>
      </section>
    </>
  );
}
