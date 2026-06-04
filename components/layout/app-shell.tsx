import { StoreProvider } from "@/lib/store-context";
import { BottomNav } from "./bottom-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <StoreProvider>
      <div className="humidor-bg min-h-dvh text-cream">
        <main className="mx-auto min-h-dvh max-w-lg pb-32">{children}</main>
        <BottomNav />
      </div>
    </StoreProvider>
  );
}
