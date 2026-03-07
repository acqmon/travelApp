"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/service/authjs/auth.queries";
import Link from "next/link";

export default function PartnerRegisterPage() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useRegisterUser();

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { ...form, role: "partner" }, // attach role
      {
        onSuccess: () => {
          router.push("/login");
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-zinc-950 dark:to-zinc-900 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white/90 backdrop-blur p-8 shadow-xl dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <h1 className="mb-2 text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Partner Registration
        </h1>

        <p className="mb-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
          Join our partner network and grow your business with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Business Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Business Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none"
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
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          {/* Error */}
          {isError && (
            <div className="text-sm text-rose-500">
              {error?.message || "Something went wrong"}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-emerald-600 py-2 text-white font-semibold transition hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50 shadow-md"
          >
            {isPending ? "Registering..." : "Become a Partner"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
