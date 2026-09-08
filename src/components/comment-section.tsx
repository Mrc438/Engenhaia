"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { createCommentAction } from "@/lib/actions/community";

type Comment = { id: string; body: string; author: { name: string } };

export function CommentSection({
  postId,
  initialComments,
  currentUserName,
}: {
  postId: string;
  initialComments: Comment[];
  currentUserName: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [comments, addOptimisticComment] = useOptimistic(
    initialComments,
    (prev, body: string) => [
      ...prev,
      { id: `optimistic-${prev.length}`, body, author: { name: currentUserName } },
    ]
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <MessageCircle className="h-4 w-4" />
        {comments.length}
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {comments.map((c) => (
            <p key={c.id} className="text-sm">
              <span className="font-semibold">{c.author.name}:</span>{" "}
              <span className="text-muted">{c.body}</span>
            </p>
          ))}

          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const body = String(formData.get("body") ?? "").trim();
              if (!body) return;
              startTransition(async () => {
                addOptimisticComment(body);
                formRef.current?.reset();
                await createCommentAction(postId, formData);
              });
            }}
            className="flex gap-2 pt-1"
          >
            <input
              name="body"
              placeholder="Escreva um comentário..."
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              disabled={isPending}
              className="btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
