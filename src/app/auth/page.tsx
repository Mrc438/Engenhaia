import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { LoginForm } from "./login-form";

export default async function AuthPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/inicio");
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="icon-chip mb-3 h-12 w-12 rounded-xl">
            <Icon name="hard-hat" className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-semibold">{siteConfig.brandName}</h1>
          <p className="mt-1 text-sm text-muted">{siteConfig.brandTagline}</p>
        </div>

        <div className="card-surface-static rounded-xl p-6">
          <LoginForm />
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="mt-4 block text-center text-xs text-muted hover:text-accent"
          >
            Recuperar acesso
          </a>
        </div>
      </div>
    </div>
  );
}
