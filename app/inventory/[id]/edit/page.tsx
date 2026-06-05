"use client";

import { EditCigarForm } from "@/components/inventory/edit-cigar-form";
import { useStore } from "@/lib/store-context";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditCigarPage() {
  const params = useParams<{ id: string }>();
  const { cigars, isLoading } = useStore();
  const cigar = cigars.find((item) => item.id === params.id);

  if (isLoading) {
    return <div className="px-5 py-10 text-center text-cream/40">Loading…</div>;
  }

  if (!cigar) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-cream/60">Cigar not found.</p>
        <Link href="/inventory" className="mt-4 inline-block text-sm font-medium text-gold">
          Back to inventory
        </Link>
      </div>
    );
  }

  return <EditCigarForm cigar={cigar} />;
}
