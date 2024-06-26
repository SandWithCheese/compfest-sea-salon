"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import FirstReservation from "./first-reservation";
import { createContext, useState } from "react";
import SecondReservation from "./second-reservation";
import { firstReservationSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionContextValue, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Branches } from "@/types/branch";

export type FirstReservationFormValues = z.infer<typeof firstReservationSchema>;

type ReservationFormContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  form1: UseFormReturn<FirstReservationFormValues>;
  session: SessionContextValue<boolean>;
};

export const ReservationFormContext =
  createContext<ReservationFormContextType | null>(null);

function ReservationForm({ branches }: { branches: Branches }) {
  const session = useSession();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const form1 = useForm<FirstReservationFormValues>({
    resolver: zodResolver(firstReservationSchema),
    defaultValues: { userId: session.data?.id },
  });

  const [contextValue, setContextValue] = useState<ReservationFormContextType>({
    currentStep,
    setCurrentStep,
    form1,
    session,
  });

  if (!session.data) {
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
