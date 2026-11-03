"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thanks for subscribing! You will hear from us soon.");
    setEmail("");
  };

  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image
        src="/images/happy.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#0b3f4d]/85" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <Mail className="size-10" />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Subscribe to our Newsletter</h2>
        <p className="max-w-xl text-base leading-relaxed text-white/90">
          Get updates on upcoming events and community activities straight to your inbox.
        </p>
        <form onSubmit={onSubmit} noValidate className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className="h-10 bg-white text-gray-900 placeholder:text-gray-500"
          />
          <Button type="submit" className="h-10 bg-white px-6 text-[#0b3f4d] hover:bg-white/90">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}