import { notFound } from "next/navigation";

export default async function dynamicId({ params }) {
  const { id } = await params;
  console.log("params", await params);
  console.log("id", id);

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  const user = await res.json();
  console.log("res", res);
  console.log("user", user);

  if (!user?.id) {
    notFound();
  }

  return (
    <div>
      <div>Id Route</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
}

//  Dynamic Routing in Next.js (App Router)

// Folder structure defines routes.
// Example: app/dynamic-route/[ext-route]/[id]/page.js → URL: /dynamic-route/adminUser/1

// Dynamic segments (folders in brackets) become params in the component.
// Example: params = { "ext-route": "adminUser", id: "1" }
// Must access using the exact folder names:
// const { id, "ext-route": extRoute } = params

// Page components can be async (server components).
// This allows direct use of await fetch() and await res.json() for data fetching — no need for useEffect or client-side state.

// Always await both fetch and res.json():
// const res = await fetch(...);
// const data = await res.json();

// Handle missing or invalid data with:
// if (!res.ok || !data?.id) notFound();

// Fetch caching options:
// { cache: "no-store" } → always fetch fresh data
// { next: { revalidate: 10 } } → revalidate every 10s
// export const dynamic = "force-dynamic"; → force dynamic rendering
