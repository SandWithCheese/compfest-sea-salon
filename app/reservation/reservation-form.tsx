"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import FirstReservation from "./first-reservation";
import { createContext, useState } from "react";
import SecondReservation from "./second-reservation";
import { firstReservationSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Branches } from "@/types/branch";
import { Session } from "next-auth";

export type FirstReservationFormValues = z.infer<typeof firstReservationSchema>;

type ReservationFormContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  form1: UseFormReturn<FirstReservationFormValues>;
  session: Session | null;
};

export const ReservationFormContext =
  createContext<ReservationFormContextType | null>(null);

function ReservationForm({
  session,
  branches,
}: {
  session: Session | null;
  branches: Branches;
}) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const form1 = useForm<FirstReservationFormValues>({
    resolver: zodResolver(firstReservationSchema),
    defaultValues: { userId: session?.id },
  });

  const [contextValue, setContextValue] = useState<ReservationFormContextType>({
    currentStep,
    setCurrentStep,
    form1,
    session,
  });

  if (!session) {
    router.push("/auth/sign-in");
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <ReservationFormContext.Provider value={contextValue}>
        {currentStep === 0 && <FirstReservation branches={branches} />}
        {currentStep === 1 && <SecondReservation branches={branches} />}
      </ReservationFormContext.Provider>
    </section>
  );
}

export default ReservationForm;
