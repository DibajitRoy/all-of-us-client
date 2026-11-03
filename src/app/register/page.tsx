"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { authClient } from "@/lib/auth-client";

type Errors = { name?: string; email?: string; photoURL?: string; password?: string };

const isUrl = (v: string) => {
  try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; }
  catch { return false; }
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {};
    if (form.name.trim().length < 2) found.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = "Enter a valid email address.";
    if (!isUrl(form.photoURL.trim())) found.photoURL = "Enter a valid photo URL.";
    if (!/[A-Z]/.test(form.password)) found.password = "Password must include an uppercase letter.";
    else if (!/[a-z]/.test(form.password)) found.password = "Password must include a lowercase letter.";
    else if (form.password.length < 6) found.password = "Password must be at least 6 characters long.";
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0] as string);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      image: form.photoURL.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "Registration failed. Please try again.");
      return;
    }
    toast.success("Account created successfully. Welcome aboard!");
    router.push("/");
    router.refresh();
  };

  const field = (k: keyof Errors) =>
    errors[k] ? <p className="text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <AuthShell title="Create Your Account" subtitle="Join our community today!">
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your full name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
          {field("name")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
          {field("email")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="photoURL">Photo URL</Label>
          <Input id="photoURL" type="url" placeholder="https://example.com/me.jpg" value={form.photoURL} onChange={(e) => set("photoURL", e.target.value)} aria-invalid={!!errors.photoURL} />
          {field("photoURL")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" placeholder="Uppercase, lowercase, 6+ characters" value={form.password} onChange={(e) => set("password", e.target.value)} aria-invalid={!!errors.password} />
          {field("password")}
        </div>
        <Button type="submit" disabled={loading} className="h-10">
          {loading && <Loader2 className="animate-spin" />} Register
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">Login here</Link>
        </p>
      </form>
    </AuthShell>
  );
}