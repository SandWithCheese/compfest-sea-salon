"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function Page() {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}

export default Page;
