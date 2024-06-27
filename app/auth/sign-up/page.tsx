import { getServerSession } from "next-auth";
import SignUpCard from "./sign-up-card";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center px-6 py-12">
      <SignUpCard session={session} />
    </main>
  );
}

export default Page;
