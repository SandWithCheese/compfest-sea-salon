import ReviewDialog from "./review-dialog";
import { ReviewsWithUser } from "@/types/reviews";
import ReviewsCard from "./reviews-card";

function NotAuthenticated({
  allReviews,
}: {
  allReviews: ReviewsWithUser | null;
}) {
  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl">Reviews</h1>

      <div className="flex flex-col gap-8">
        <ReviewDialog session={null} />

        {/* Users Reviews Pagination */}
        {allReviews &&
          allReviews.map((review) => (
            <ReviewsCard key={review.id} review={review} />
          ))}
      </div>
    </main>
  );
}

export default NotAuthenticated;
