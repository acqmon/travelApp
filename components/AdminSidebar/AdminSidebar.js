"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/navigation/page.navigation.routes";

const userManagement = [
  {
    title: "Admin Users",
    href: PAGE_ROUTES.ADMIN_PAGES.ADMIN_USERS,
  },
  {
    title: "Users",
    href: PAGE_ROUTES.ADMIN_PAGES.USERS,
  },
  {
    title: "Partners",
    href: PAGE_ROUTES.ADMIN_PAGES.PARTNERS,
  },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-60">
      <div className="p-4 text-primary">
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      <nav className="px-4">
        {/* Parent Item */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left font-semibold text-accent hover:text-primary"
        >
          User Management
        </button>

        {/* Children */}
        {isOpen && (
          <ul className="ml-4 mt-2 space-y-2 text-sm">
            {userManagement.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="block h-5 text-accent flex items-center hover:text-primary cursor-pointer hover:bg-primary-light"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
