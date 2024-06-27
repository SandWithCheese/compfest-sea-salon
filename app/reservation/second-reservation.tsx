"use client";

import { useContext, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronLeft, ChevronsUpDown } from "lucide-react";

import { ReservationFormContext } from "./reservation-form";
import { Services } from "@/types/service";
import { getServicesFromBranchId } from "@/lib/query";
import { cn } from "@/lib/utils";
import { Branches } from "@/types/branch";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { z } from "zod";
import { generateSecondReservationSchema } from "@/lib/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { convertTo12HourFormat } from "@/lib/time";

function SecondReservation({ branches }: { branches: Branches }) {
  const [services, setServices] = useState<Services | null>([]);

  const context = useContext(ReservationFormContext);

  const router = useRouter();

  if (!context) {
    throw new Error("useReservationForm must be used within a ReservationForm");
  }

  const { setCurrentStep, form1 } = context;
  const currentBranch = branches.find(
    (branch) => branch.id === form1.getValues("branch"),
  )!;

  const secondReservationSchema = generateSecondReservationSchema(
    currentBranch.openingTime,
    currentBranch.closingTime,
  );

  type SecondReservationFormValues = z.infer<typeof secondReservationSchema>;

  const form2 = useForm<SecondReservationFormValues>({
    resolver: zodResolver(secondReservationSchema),
  });

  async function onSubmit(data: SecondReservationFormValues) {
    // Show loading toast
    const loadingToast = toast.loading("Submitting...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Destructure form data
    const { branch, userId } = form1.getValues();
    const { datetime, service } = data;

    // Create form data
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("datetime", datetime.toISOString());
    formData.append("service", service);
    formData.append("userId", userId);

    // Make API request
    const res = await fetch("/api/reservation", {
      method: "POST",
      body: formData,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to make reservation", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Reservation made successfully", {
      description: "Thank you for choosing us",
    });

    // Redirect to dashboard page
    router.push("/dashboard");
  }

  useEffect(() => {
    async function serviceQuery() {
      const services = await getServicesFromBranchId(form1.getValues("branch"));
      setServices(services);
    }

    serviceQuery();
  }, [form1]);

  if (!services) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Card className="w-full max-w-[600px] py-8">
        <CardHeader className="relative">
          <Button
            className="absolute top-0 size-fit p-2"
            aria-label="Back Button"
            onClick={() => {
              setCurrentStep(0);
              form2.reset({ service: "", datetime: new Date() });
            }}
          >
            <ChevronLeft size={20} />
          </Button>
          <CardTitle className="text-center">Reservation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(onSubmit)}
              className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-6"
            >
              <FormField
                control={form2.control}
                name="service"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Service</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? services.find(
                                  (service) => service.id === field.value,
                                )?.name
                              : "Select service..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {services.map((service) => (
                              <CommandItem
                                value={service.name}
                                key={service.id}
                                onSelect={() => {
                                  form2.setValue("service", service.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    service.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {service.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="datetime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="datetime">Date time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="second"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      This branch opens at{" "}
                      {convertTo12HourFormat(currentBranch.openingTime)} and
                      closes at{" "}
                      {convertTo12HourFormat(currentBranch.closingTime)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="self-center">
                <FormControl>
                  <Button type="submit" className="rounded-full px-8 lg:px-16">
                    Reserve
                  </Button>
                </FormControl>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default SecondReservation;
