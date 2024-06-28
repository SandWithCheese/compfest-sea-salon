import { getServerSession } from "next-auth";
import SignInCard from "./sign-in-card";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Sign In | SEA Salon",
  openGraph: {
    ...openGraphTemplate,
    title: "Sign In | SEA Salon",
  },
  twitter: {
    ...twitterTemplate,
    title: "Sign In | SEA Salon",
  },
};

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12">
      <SignInCard session={session} />
    </main>
  );
}

export default Page;
