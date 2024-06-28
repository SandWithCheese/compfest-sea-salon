"use client";

import ReviewsCard from "./reviews-card";
import { ReviewsWithUser, ReviewWithUser } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";
import { Session } from "next-auth";
import ReviewDialog from "./review-dialog";
import EditDialog from "./edit-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isPageValid } from "@/lib/validate-pagination";
import { ClientPagination } from "../../components/client-pagination";

function Authenticated({
  allReviewsWithUser,
  userReviewWithUser,
  session,
}: {
  allReviewsWithUser: ReviewsWithUser | null;
  userReviewWithUser: ReviewWithUser | null;
  session: Session | null;
}) {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page"); // Pagination state

  // Pagination
  const totalPerPage = 5;
  const startIdx = (parseInt(page ?? "1") - 1) * totalPerPage; // Include start index
  const endIdx = startIdx + totalPerPage; // Exclude end index
  const total = allReviewsWithUser?.length ?? 0;

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
      <h1 className="font-belleza text-5xl" data-aos="fade-up">
        Reviews
      </h1>

      <div className="flex flex-col gap-8">
        {userReviewWithUser ? (
          <EditDialog session={session} review={userReviewWithUser} />
        ) : (
          <ReviewDialog session={session} />
        )}

        {/* Session User Review */}
        {userReviewWithUser && (
          <div className="flex flex-col gap-8">
            <ReviewsCard
              key={userReviewWithUser.id}
              review={userReviewWithUser}
            />
            <Separator
              className="border-t-2 border-dashed bg-transparent"
              data-aos="fade-up"
            />
          </div>
        )}

        {/* Users Reviews Pagination */}
        {allReviewsWithUser &&
          allReviewsWithUser
            .slice(startIdx, endIdx)
            .map((review) => <ReviewsCard key={review.id} review={review} />)}
      </div>

      {/* Pagination */}
      <ClientPagination total={total} totalPerPage={totalPerPage} animate />
    </main>
  );
}

export default Authenticated;
