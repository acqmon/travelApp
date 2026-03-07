"use client";
import Image from "next/image";
import { API_ROUTES } from "@/constants/api.routes";
import { useRegisterUser } from "@/service/authjs/auth.queries";

export default function Home() {
  const { REGISTER_USER } = API_ROUTES.AUTH;
  const { mutate, isPending, isError, error, data } = useRegisterUser();

  const handleRegister = () => {
    mutate({
      name: "Test User",
      email: "test@example.com",
      password: "12345678",
    });
  };

  // const handleRegisterAPI = async () => {
  //   try {
  //     const res = await fetch(REGISTER_USER, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "Test User",
  //         email: "testuser@example.com",
  //         password: "password123",
  //       }),
  //     });

  //     const data = await res.json();

  //     console.log("data", data);

  //     if (!res.ok) {
  //       console.log("Register failed:", data);
  //       return;
  //     }

  //     console.log("Register success:", data);
  //   } catch (error) {
  //     console.error("Network/Register error:", error);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <div>Home</div>

        {/* <button
          onClick={handleRegister}
          disabled={isPending}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          {isPending ? "Registering..." : "Register User"}
        </button> */}
      </main>
    </div>
  );
}
