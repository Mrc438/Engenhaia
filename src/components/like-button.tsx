"use client";

import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleLikeAction } from "@/lib/actions/community";

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [, startTransition] = useTransition();
  const [state, setOptimistic] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    (prev, liked: boolean) => ({ liked, count: prev.count + (liked ? 1 : -1) })
  );

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!state.liked);
          await toggleLikeAction(postId);
        })
      }
      className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
        state.liked ? "text-accent" : "text-muted hover:text-foreground"
      }`}
    >
      <Heart className="h-4 w-4" fill={state.liked ? "currentColor" : "none"} />
      {state.count}
    </button>
  );
}
