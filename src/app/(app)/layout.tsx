import { requireUser } from "@/lib/auth-helpers";
import { Sidebar } from "@/components/sidebar";
import { TopBanner } from "@/components/top-banner";
import { MobileNav } from "@/components/mobile-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen flex-1">
      <Sidebar
        user={{ name: user.name ?? "Você", email: user.email ?? "", hasProjetosPacote: user.hasProjetosPacote }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBanner />
        <MobileNav hasProjetosPacote={user.hasProjetosPacote} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
