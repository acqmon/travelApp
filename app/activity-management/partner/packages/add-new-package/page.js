"use client";

import { useState } from "react";
import { useCreatePackage } from "@/service/packages/packages.queries.js";

export default function AddNewPackagePage() {
  const partnerId = "adf45398-6d84-4ab7-a389-f9f6c08fb6c5"; // replace with real partnerId from cookies/session
  const { mutate: createPackage, isLoading } = useCreatePackage();

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Active", // hardcoded status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!partnerId) return alert("Partner not found");

    createPackage({
      partnerId,
      name: form.name,
      type: form.type,
      price: parseFloat(form.price),
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      statusId:
        form.status === "Active"
          ? "a3dfd1dc-3845-4ba7-8c2d-c9133b79cefb"
          : "62ac1e68-6142-42cc-bada-90738cfa1065", // replace with actual IDs
    });
  };

  return (
    <div className="p-6 min-h-screen bg-slate-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Add New Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md max-w-2xl mx-auto space-y-4"
      >
        {/* Package Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Package Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
          />
        </div>

        {/* Package Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
          >
            <option value="">Select Type</option>
            <option value="Kayaking">Kayaking</option>
            <option value="Trekking">Trekking</option>
            <option value="Resort">Resort</option>
            <option value="Camping">Camping</option>
            <option value="Safari">Safari</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>
  );
}
