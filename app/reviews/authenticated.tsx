import ReviewsCard from "./reviews-card";
import { ReviewsWithUser, ReviewWithUser } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";
import { Session } from "next-auth";
import ReviewDialog from "./review-dialog";
import EditDialog from "./edit-dialog";

function Authenticated({
  allReviewsWithUser,
  userReviewWithUser,
  session,
}: {
  allReviewsWithUser: ReviewsWithUser | null;
  userReviewWithUser: ReviewWithUser | null;
  session: Session | null;
}) {
  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl">Reviews</h1>

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
            <Separator className="border-t-2 border-dashed bg-transparent" />
          </div>
        )}

        {/* Users Reviews Pagination */}
        {allReviewsWithUser &&
          allReviewsWithUser.map((review) => (
            <ReviewsCard key={review.id} review={review} />
          ))}
      </div>
    </main>
  );
}

export default Authenticated;
