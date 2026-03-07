"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/service/authjs/auth.queries";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useRegisterUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur p-8 shadow-xl dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <h1 className="mb-6 text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

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
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
              minLength={6}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Error Message */}
          {isError && (
            <div className="text-sm text-rose-500">
              {error?.message || "Something went wrong"}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium transition hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 shadow-md"
          >
            {isPending ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
