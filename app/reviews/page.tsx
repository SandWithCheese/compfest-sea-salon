import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getAllReviewsWithUser, getReviewsWithUsers } from "@/lib/query";
import NotAuthenticated from "./not-authenticated";
import Authenticated from "./authenticated";

async function Page() {
  const session = await getServerSession(authOptions);

  const allReviews = await getReviewsWithUsers();

  if (!session) {
    return <NotAuthenticated allReviews={allReviews} />;
  }

  const [allReviewsWithUser, userReviewWithUser] = await getAllReviewsWithUser(
    session.id,
  );

  return (
    <Authenticated
      allReviewsWithUser={allReviewsWithUser}
      userReviewWithUser={userReviewWithUser}
      session={session}
    />
  );
}

export default Page;
