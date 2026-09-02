import { signOutAction } from "@/lib/actions/auth";
import { Icon } from "@/components/icon";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-danger transition-colors"
      >
        <Icon name="log-out" className="h-4 w-4" />
        Sair
      </button>
    </form>
  );
}
