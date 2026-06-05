"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.6}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.18 : 0}
        />
      </svg>
    ),
  },
  {
    href: "/inventory",
    label: "Cellar",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M3 9.5h18M8 5V3.5M16 5V3.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/add",
    label: "Add",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/journal",
    label: "Journal",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
        <path
          d="M6 4h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.6}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? 0.15 : 0}
        />
        <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
      </svg>
    ),
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 safe-bottom lg:hidden">
      <div className="mx-auto max-w-lg px-4 pb-3">
        <div className="glass-card-strong flex items-end justify-around rounded-2xl px-1 py-2 shadow-card">
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.href);
            const isAdd = tab.href === "/add";

            if (isAdd) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="group -mt-7 flex flex-col items-center gap-1 transition-transform duration-200 active:scale-95"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      active
                        ? "border-gold bg-gold text-charcoal shadow-gold-glow"
                        : "border-gold/40 bg-gradient-to-br from-gold/20 to-brass/10 text-gold group-hover:border-gold/70 group-hover:shadow-gold-glow"
                    }`}
                  >
                    {tab.icon(active)}
                  </span>
                  <span className={`text-[10px] font-semibold tracking-wide ${active ? "text-gold" : "text-gold/70"}`}>
                    {tab.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all duration-200 active:scale-95 ${
                  active ? "text-gold" : "text-cream/40 hover:text-cream/65"
                }`}
              >
                {active && (
                  <span className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-gold shadow-gold-glow" />
                )}
                <span className={`transition-transform duration-200 ${active ? "scale-110" : ""}`}>
                  {tab.icon(active)}
                </span>
                <span className={`text-[10px] font-medium tracking-wide ${active ? "font-semibold" : ""}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
