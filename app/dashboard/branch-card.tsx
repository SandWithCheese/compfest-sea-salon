"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BranchWithServices } from "@/types/branchservice";
import { convertTo12HourFormat } from "@/lib/time";

function BranchCard({ branch }: { branch: BranchWithServices }) {
  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="line-clamp-1">{branch.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="line-clamp-1">Location: {branch.location}</p>

        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full">Edit Branch</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-8 py-12">
            <DialogHeader>
              <DialogTitle className="text-center font-belleza text-3xl">
                Branch Details
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-center text-base">
              <p>Name: {branch.name}</p>
              <p>Location: {branch.location}</p>
              <p>Opening Time: {convertTo12HourFormat(branch.openingTime)}</p>
              <p>Closing Time: {convertTo12HourFormat(branch.closingTime)}</p>
              <div>
                <p>Services:</p>
                {branch.services.map((service) => (
                  <p key={service.serviceId}>{service.service.name}</p>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default BranchCard;
