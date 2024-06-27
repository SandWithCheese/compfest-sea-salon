import { BranchServices } from "@/types/branchservice";
import { Session } from "next-auth";
import React from "react";

function AdminDashboard({
  branchServices,
  session,
}: {
  branchServices: BranchServices | null;
  session: Session;
}) {
  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
