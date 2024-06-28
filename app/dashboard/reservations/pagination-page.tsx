"use client";

import { isPageValid } from "@/lib/validate-pagination";
import { ReservationDetails } from "@/types/reservation";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ReservationDialog from "../reservation-dialog";
import { ClientPagination } from "@/components/client-pagination";

function PaginationPage({
  reservations,
}: {
  reservations: ReservationDetails | null;
}) {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page"); // Pagination state

  // Pagination
  const totalPerPage = 8;
  const startIdx = (parseInt(page ?? "1") - 1) * totalPerPage; // Include start index
  const endIdx = startIdx + totalPerPage; // Exclude end index
  const total = reservations?.length ?? 0;

  useEffect(() => {
    // New search params
    const newSearchParams = new URLSearchParams(searchParams);

    // Validate page
    if (!isPageValid(page, total, totalPerPage)) {
      newSearchParams.set("page", "1");
    }

    router.replace(`/dashboard/reservations?${newSearchParams.toString()}`);
  }, [page, router, searchParams, total]);

  return (
    <div className="flex h-full grow flex-col justify-between gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reservations && reservations.length > 0 ? (
          reservations
            .slice(startIdx, endIdx)
            .map((reservation) => (
              <ReservationDialog
                key={reservation.id}
                reservation={reservation}
              />
            ))
        ) : (
          <p>You have no current reservations.</p>
        )}
      </div>

      <ClientPagination total={total} totalPerPage={totalPerPage} />
    </div>
  );
}

export default PaginationPage;
