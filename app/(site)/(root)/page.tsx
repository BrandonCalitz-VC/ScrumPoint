"use client"
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex h-screen">
      <button onClick={()=>signOut()} className="w-16 h-5 bg-black"/>
    </main>
  )
}
