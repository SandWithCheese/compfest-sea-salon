"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReservationDetail } from "@/types/reservation";
import { Button } from "@/components/ui/button";
import { formatMinutes } from "@/lib/time";

function ReservationDialog({
  reservation,
}: {
  reservation: ReservationDetail;
}) {
  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="line-clamp-1">
          {reservation.services.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="line-clamp-1">Branch: {reservation.branches.name}</p>

        <p>
          {reservation.datetime
            .toLocaleString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "UTC",
            })
            .replace(",", "")}
        </p>

        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full">Details</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-8 py-12">
            <DialogHeader>
              <DialogTitle className="text-center font-belleza text-3xl">
                Reservation Details
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col items-center gap-2 text-base">
              <p>Branch: {reservation.branches.name}</p>
              <p>Location: {reservation.branches.location}</p>
              <p>Service: {reservation.services.name}</p>
              <p>Duration: {formatMinutes(reservation.services.duration)}</p>
              <p>
                Date & Time:{" "}
                {reservation.datetime
                  .toLocaleString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC",
                  })
                  .replace(",", "")}
              </p>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ReservationDialog;
