"use client";

import { useContext } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

import {
  FirstReservationFormValues,
  ReservationFormContext,
} from "./reservation-form";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Branches } from "@/types/branch";

function FirstReservation({ branches }: { branches: Branches }) {
  const context = useContext(ReservationFormContext);

  if (!context) {
    throw new Error("useReservationForm must be used within a ReservationForm");
  }

  const { setCurrentStep, form1, session } = context;

  async function onSubmit(data: FirstReservationFormValues) {
    setCurrentStep(1);
  }

  return (
    <>
      <Card className="w-full max-w-[600px] py-8">
        <CardHeader>
          <CardTitle className="text-center">Reservation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form1}>
            <form
              onSubmit={form1.handleSubmit(onSubmit)}
              className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-6"
            >
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="Name"
                    disabled
                    value={session?.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="phone"
                    placeholder="Phone Number"
                    disabled
                    value={session?.phone}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form1.control}
                name="branch"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Branch</FormLabel>
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
                              ? branches.find(
                                  (branch) => branch.id === field.value,
                                )?.name
                              : "Select branch..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {branches.map((branch) => (
                              <CommandItem
                                value={branch.name}
                                key={branch.id}
                                onSelect={() => {
                                  form1.setValue("branch", branch.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    branch.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {branch.name}
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

              <FormItem className="self-center">
                <FormControl>
                  <Button type="submit" className="rounded-full px-8 lg:px-16">
                    Next Step
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

export default FirstReservation;
