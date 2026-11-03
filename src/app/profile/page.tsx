"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/section-heading";
import { authClient } from "@/lib/auth-client";

const isUrl = (v: string) => {
  try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; }
  catch { return false; }
};

function ProfileForm({ user }: { user: { name: string; email: string; image?: string | null } }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return void toast.error("Please enter your name.");
    if (!isUrl(image.trim())) return void toast.error("Enter a valid photo URL.");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() });
    setLoading(false);
    if (error) return void toast.error(error.message ?? "Could not update your profile.");
    toast.success("Profile updated successfully.");
    router.refresh();
  };

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm">
        <Avatar className="size-28">
          <AvatarImage src={image || undefined} alt={name} referrerPolicy="no-referrer" />
          <AvatarFallback className="text-3xl">{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="mt-4 text-lg font-semibold">{name}</p>
        <p className="break-all text-sm text-muted-foreground">{user.email}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={user.email} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Photo URL</Label>
          <Input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading} className="h-10">
          {loading && <Loader2 className="animate-spin" />} Update Profile
        </Button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="My Profile" subtitle="Keep your information up to date." />
      <div className="mt-8">
        {isPending || !session ? (
          <Skeleton className="h-72 w-full rounded-2xl" />
        ) : (
          <ProfileForm user={session.user} />
        )}
      </div>
    </main>
  );
}