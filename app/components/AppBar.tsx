"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AppBar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-between items-center">
        <span>MusiX</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <span>MusiX</span>

      {session?.user ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
}
