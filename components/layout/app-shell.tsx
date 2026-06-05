import { StoreProvider } from "@/lib/store-context";
import { BottomNav } from "./bottom-nav";
import { DesktopSidebar } from "./desktop-sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <StoreProvider>
      <div className="humidor-bg min-h-dvh text-cream">
        <DesktopSidebar />
        <main className="mx-auto min-h-dvh max-w-lg pb-32 lg:max-w-none lg:pb-8">
          <div className="lg:pl-64">
            <div className="mx-auto lg:max-w-[1400px]">{children}</div>
          </div>
        </main>
        <BottomNav />
      </div>
    </StoreProvider>
  );
}
