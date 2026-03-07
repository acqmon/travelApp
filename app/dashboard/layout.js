"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="));

    setIsAuthenticated(!!hasSession);
  }, []);

  function logout() {
    // Clear cookie manually
    const cookiesToRemove = ["userId", "role"];

    cookiesToRemove.forEach((cookie) => {
      document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div>
      <header style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
        <strong>My App</strong>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </header>

      <main>{children}</main>
    </div>
  );
}
