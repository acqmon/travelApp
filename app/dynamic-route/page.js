import Link from "next/link";

export default async function DynamicRoute() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users = await res.json();

  console.log("res", await users);
  return (
    <div>
      <h1 className="text-success">Next.js Dynamic Route</h1>

      <hr />

      {users?.map((user, index) => {
        return (
          <div key={index}>
            <Link href={`/dynamic-route/ext-route/${user.id}`}>
              {user.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// It fetches a list of users from the API and displays them.
// Each user name is wrapped in a <Link> that navigates to their dynamic route (/dynamic-route/ext-route/[id]).
// We disable caching using { cache: "no-store" } to ensure data is always fresh when navigating back.
