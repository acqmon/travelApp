import Link from "next/link";

const TopNavBar = () => {
  return (
    <div className="text-danger">
      <div>
        <nav className="d-flex gap-3 fs-2">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/image">Image</Link>
          <Link href="/client-comp">Client-Comp</Link>
          <Link href="/server-comp">Server-Comp</Link>
          <Link href="/dynamic-route">Dynamic-route</Link>
          {/* <Link href="/dynamic-route/lead-route">lead-route</Link> just for reference */}
        </nav>
      </div>
    </div>
  );
};

export default TopNavBar;

//  Next.js <Link> Component Notes
// - Used for client-side navigation between routes (no full page reload).
// - Always import from 'next/link' →  import Link from 'next/link'
// - The href path should match your folder structure under the `app/` directory:
//     app/page.tsx               →  "/"
//     app/about/page.tsx         →  "/about"
//     app/server-comp/page.tsx   →  "/server-comp"
// - Use absolute paths starting with "/" (not "./") to avoid routing issues.
// - No need to include file names or extensions (e.g., no /page.tsx or .tsx).
// - Works only for internal routes. For external URLs, use <a href="..."> instead.
// - Example:
//     <Link href="/server-comp">Server Comp</Link>
// - Provides fast, seamless navigation without reloading the page.
