import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Dashboard | Research Management Portal</title>
        <meta name="description" content="Dashboard overview for the research management portal with quick stats and recent activity." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="dashboard-heading" className="space-y-4">
        <h1 id="dashboard-heading" className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening across your projects.</p>
      </section>
    </>
  );
}
