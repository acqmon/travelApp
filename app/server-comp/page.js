export default function ServerComponent() {
  console.log("server component");
  return (
    <div>
      <h1 className="text-success">Next.js server component</h1>
    </div>
  );
}

//  Next.js Server Component Notes
// - Server Components are the default in the App Router (no "use client" needed).
// - Rendered on the server — not included in the client JS bundle (faster & smaller).
// - Can fetch data directly (async/await, DB queries, APIs, etc.).
// - Cannot use:
//     • useState, useEffect, useRef
//     • event handlers (onClick, etc.)
//     • browser APIs like window or document
// - Can import other Server Components and fetch data freely.
// - Can pass data/props to Client Components.
// - Example:
//     // No "use client"
//     export default async function Page() {
//       const res = await fetch('https://api.example.com/posts')
//       const posts = await res.json()
//       return (
//         <ul>
//           {posts.map(p => <li key={p.id}>{p.title}</li>)}
//         </ul>
//       )
//     }
