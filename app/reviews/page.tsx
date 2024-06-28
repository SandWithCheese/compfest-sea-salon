import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { getAllReviewsWithUser, getReviewsWithUsers } from "@/lib/query";
import NotAuthenticated from "./not-authenticated";
import Authenticated from "./authenticated";
import { Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Reviews | SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "Reviews | SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "Reviews | SEA Salon",
  },
};

async function Page() {
  const session = await getServerSession(authOptions);

  const allReviews = await getReviewsWithUsers();

  if (!session || session.role === "admin") {
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
