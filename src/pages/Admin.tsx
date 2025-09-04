import { Helmet } from "react-helmet-async";

export default function Admin() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <>
      <Helmet>
        <title>Admin | Research Management Portal</title>
        <meta name="description" content="System administration, roles, and configuration overview." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section aria-labelledby="admin-heading" className="space-y-4">
        <h1 id="admin-heading" className="text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">Manage users, roles, and system settings.</p>
      </section>
    </>
  );
}
