"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGE_ROUTES } from "@/navigation/page.navigation.routes";

// Example menu config by role
const MENU_CONFIG = {
  ADMIN: [
    {
      title: "User Management",
      children: [
        { title: "Admin Users", href: PAGE_ROUTES.ADMIN_PAGES.ADMIN_USERS },
        { title: "Users", href: PAGE_ROUTES.ADMIN_PAGES.USERS },
        { title: "Partners", href: PAGE_ROUTES.ADMIN_PAGES.PARTNERS },
      ],
    },
    {
      title: "Settings",
      children: [
        { title: "Roles", href: PAGE_ROUTES.ADMIN_PAGES.ROLES },
        { title: "Statuses", href: PAGE_ROUTES.ADMIN_PAGES.STATUSES },
      ],
    },
  ],
  PARTNER: [
    { title: "Dashboard", href: PAGE_ROUTES.PARTNER_PAGES.DASHBOARD },
    {
      title: "Packages",
      children: [
        {
          title: "Add New Package",
          href: PAGE_ROUTES.PARTNER_PAGES.ADD_NEW_PACKAGE,
        },
        { title: "My Packages", href: PAGE_ROUTES.PARTNER_PAGES.PACKAGES },
      ],
    },
    {
      title: "Bookings",
      children: [
        { title: "My Bookings", href: PAGE_ROUTES.PARTNER_PAGES.BOOKINGS },
      ],
    },
    {
      title: "Profile",
      children: [
        { title: "Edit Profile", href: PAGE_ROUTES.PARTNER_PAGES.PROFILE },
      ],
    },
  ],
  USER: [
    {
      title: "Dashboard",
      href: PAGE_ROUTES.USER_PAGES.DASHBOARD,
    },
    {
      title: "Packages",
      href: PAGE_ROUTES.USER_PAGES.PACKAGES,
    },
    {
      title: "Bookings",
      children: [
        { title: "My Bookings", href: PAGE_ROUTES.USER_PAGES.BOOKINGS_LIST },
      ],
    },
    {
      title: "Profile",
      children: [
        { title: "Edit Profile", href: PAGE_ROUTES.USER_PAGES.PROFILE },
      ],
    },
  ],
};

const Sidebar = ({ role }) => {
  const [openMenus, setOpenMenus] = useState({});
  const menus = useMemo(() => MENU_CONFIG[role] || [], [role]);
  const pathname = usePathname();

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-60 min-h-screen bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
          {role}
        </h2>
      </div>

      <nav className="px-4">
        {menus.map((menu) => (
          <div key={menu.title} className="mb-2">
            {/* Parent item */}
            {menu.children?.length > 0 ? (
              <button
                onClick={() => toggleMenu(menu.title)}
                aria-expanded={!!openMenus[menu.title]}
                aria-controls={`${menu.title}-submenu`}
                className="w-full text-left font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-indigo-400 px-2 py-1 rounded flex justify-between items-center"
              >
                {menu.title}
                <span className="ml-2">
                  {openMenus[menu.title] ? "▲" : "▼"}
                </span>
              </button>
            ) : menu.href ? (
              <Link
                href={menu.href}
                className={`block w-full text-left font-semibold px-2 py-1 rounded cursor-pointer hover:text-primary dark:hover:text-indigo-400 hover:bg-primary-light dark:hover:bg-zinc-700 ${
                  pathname === menu.href
                    ? "bg-primary-light dark:bg-zinc-700 font-bold"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {menu.title}
              </Link>
            ) : (
              <span className="block w-full text-left font-semibold px-2 py-1 text-zinc-700 dark:text-zinc-300">
                {menu.title}
              </span>
            )}

            {/* Children */}
            {menu.children && openMenus[menu.title] && (
              <ul
                id={`${menu.title}-submenu`}
                className="ml-4 mt-2 space-y-1 text-sm"
              >
                {menu.children
                  .filter((item) => item.href)
                  .map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={`block w-full text-left px-2 py-1 rounded cursor-pointer hover:text-primary dark:hover:text-indigo-400 hover:bg-primary-light dark:hover:bg-zinc-700 flex items-center ${
                          pathname === item.href
                            ? "bg-primary-light dark:bg-zinc-700 font-bold"
                            : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
