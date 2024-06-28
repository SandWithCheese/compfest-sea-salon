"use client";

import ReviewDialog from "./review-dialog";
import { ReviewsWithUser } from "@/types/reviews";
import ReviewsCard from "./reviews-card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isPageValid } from "@/lib/validate-pagination";
import { ClientPagination } from "../../components/client-pagination";

function NotAuthenticated({
  allReviews,
}: {
  allReviews: ReviewsWithUser | null;
}) {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page"); // Pagination state

  // Pagination
  const totalPerPage = 5;
  const startIdx = (parseInt(page ?? "1") - 1) * totalPerPage; // Include start index
  const endIdx = startIdx + totalPerPage; // Exclude end index
  const total = allReviews?.length ?? 0;

  useEffect(() => {
    // New search params
    const newSearchParams = new URLSearchParams(searchParams);

    // Validate page
    if (!isPageValid(page, total, totalPerPage)) {
      newSearchParams.set("page", "1");
    }

    router.replace(`/reviews?${newSearchParams.toString()}`);
  }, [page, router, searchParams, total]);

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl">Reviews</h1>

      <div className="flex flex-col gap-8">
        <ReviewDialog session={null} />

        {/* Users Reviews Pagination */}
        {allReviews &&
          allReviews
            .slice(startIdx, endIdx)
            .map((review) => <ReviewsCard key={review.id} review={review} />)}
      </div>

      {/* Pagination */}
      <ClientPagination total={total} totalPerPage={totalPerPage} />
    </main>
  );
}

export default NotAuthenticated;
