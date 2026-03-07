"use client";

export default function ClientComponent() {
  console.log("client component");
  return (
    <div>
      <h1 className="text-success">Next.js client Component tutorial</h1>

      <div></div>
    </div>
  );
}

// Next.js Client Component Notes
// - Add `"use client"` at the very top of the file (must be the 1st line).
// - Required only if the component uses browser-only features like:
//     • useState, useEffect, useRef
//     • event handlers (onClick, onChange, etc.)
//     • direct access to window/document
// - Server Components (default) cannot use these React hooks.
// - Client Components can import Server Components, but not vice versa.
// - Keep them small and focused to reduce client-side JS bundle size.
// - Example:
//     "use client"
//     import { useState } from 'react'
//     export default function Counter() {
//       const [count, setCount] = useState(0)
//       return <button onClick={() => setCount(c => c + 1)}>{count}</button>
//     }
