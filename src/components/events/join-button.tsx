"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

export function JoinButton({ eventId, ended }: { eventId: string; ended: boolean }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;
  const [status, setStatus] = useState<"unknown" | "joined" | "idle">("unknown");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;
    let active = true;
    authFetch<{ joined: boolean }>(`/join-status/${eventId}`).then(({ ok, data }) => {
      if (active) setStatus(ok && data.joined ? "joined" : "idle");
    });
    return () => { active = false; };
  }, [email, eventId]);

  const joined = Boolean(email) && status === "joined";

  const handleJoin = async () => {
    if (!email) {
      toast.error("Please log in to join this event.");
      router.push("/login");
      return;
    }
    setLoading(true);
    const { ok, status: code, data } = await authFetch(`/join-event/${eventId}`, { method: "POST" });
    setLoading(false);
    if (ok) {
      setStatus("joined");
      toast.success("You have joined this event. See you there!");
      router.refresh();
    } else if (code === 409) {
      setStatus("joined");
      toast.info("You have already joined this event.");
    } else {
      toast.error(data.msg ?? "Could not join the event.");
    }
  };

  if (ended) return <Button disabled className="h-11 w-full">Event Ended</Button>;
  if (joined) return <Button disabled className="h-11 w-full"><CheckCircle2 /> You Joined</Button>;
  return (
    <Button onClick={handleJoin} disabled={loading || (Boolean(email) && status === "unknown")} className="h-11 w-full">
      {loading ? <Loader2 className="animate-spin" /> : <UserPlus />}
      Join Event
    </Button>
  );
}