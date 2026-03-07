"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PAGE_ROUTES } from "@/navigation/page.navigation.routes";
import { RoleConstants } from "@/constants/role.constants";
import { useLoginUser } from "@/service/authjs/auth.queries";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useLoginUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const ROLE_REDIRECT = {
    [RoleConstants.ADMIN]: PAGE_ROUTES.ADMIN_PAGES.DASHBOARD,
    [RoleConstants.USER]: PAGE_ROUTES.USER_PAGES.DASHBOARD,
    [RoleConstants.PARTNER]: PAGE_ROUTES.PARTNER_PAGES.DASHBOARD,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: (responseData) => {
        router.push(ROLE_REDIRECT[responseData.data.role.code]);
        router.refresh();
      },
      onError: (error) => {
        console.log("error", error);
        return;
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur p-8 shadow-xl dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <h1 className="mb-6 text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 text-red-400  focus:ring-indigo-500 focus:border-indigo-500 transition "
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 text-red-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Error Message */}
          {isError && (
            <div className="text-sm text-rose-500">
              {error?.message || "Invalid email or password"}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 shadow-md"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>New here?</p>

          <div className="mt-2 flex justify-center gap-6">
            <Link
              href="/register"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Register as User
            </Link>

            <Link
              href="/register/partner"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
