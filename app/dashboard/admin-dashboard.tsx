"use client";

import { BranchServices } from "@/types/branchservice";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import BranchCard from "./branch-card";
import { ClientPagination } from "@/components/client-pagination";
import { useEffect, useState } from "react";
import { isPageValid } from "@/lib/validate-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchServiceSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { TimePicker } from "@/components/ui/datetime-picker";
import { Services } from "@/types/service";
import { toast } from "sonner";

type BranchServiceFormValues = z.infer<typeof branchServiceSchema>;

function AdminDashboard({
  branchServices,
  services,
  session,
}: {
  branchServices: BranchServices | null;
  services: Services | null;
  session: Session;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<BranchServiceFormValues>({
    resolver: zodResolver(branchServiceSchema),
    defaultValues: { services: [] },
  });

  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page"); // Pagination state

  // Pagination
  const totalPerPage = 8;
  const startIdx = (parseInt(page ?? "1") - 1) * totalPerPage; // Include start index
  const endIdx = startIdx + totalPerPage; // Exclude end index
  const total = branchServices?.length ?? 0;

  useEffect(() => {
    // New search params
    const newSearchParams = new URLSearchParams(searchParams);

    // Validate page
    if (!isPageValid(page, total, totalPerPage)) {
      newSearchParams.set("page", "1");
    }

    router.replace(`/dashboard?${newSearchParams.toString()}`);
  }, [page, router, searchParams, total]);

  async function onSubmit(data: BranchServiceFormValues) {
    // Show loading toast
    const loadingToast = toast.loading("Submitting...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Destructure form data
    const { name, location, openingTime, closingTime, services } =
      form.getValues();

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("openingTime", openingTime);
    formData.append("closingTime", closingTime);

    // Make API request
    const res = await fetch("/api/branches", {
      method: "POST",
      body: formData,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to create a branch", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Branch created successfully", {
      description: "Added a new branch to the list",
    });

    // Show loading toast
    const loadingToast2 = toast.loading("Submitting...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Make API request for each service using Promise.all
    const response = await res.json();
    const branchId = response.id;

    // Create form data for services
    let formDatas: FormData[] = [];
    services.forEach((service) => {
      const formData = new FormData();
      formData.append("branchId", branchId);
      formData.append("serviceId", service);
      formDatas.push(formData);
    });

    // Make API request for each service
    const promises = formDatas.map((formData) => {
      return fetch("/api/branchservice", {
        method: "POST",
        body: formData,
      });
    });

    // Wait for all promises to resolve
    const responses = await Promise.all(promises);

    // Dismiss loading toast
    toast.dismiss(loadingToast2);

    // Check if all responses are successful
    if (responses.some((response) => !response.ok)) {
      // Show error toast
      toast.error("Failed to create branch/services", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Services added to the branch successfully", {
      description: "Added services to the branch",
    });

    // Close the dialog
    setOpen(false);

    // Reset the form
    form.reset();

    // Redirect to dashboard page
    router.refresh();
  }

  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col gap-8 px-6 py-12 sm:px-16">
      <h1 className="font-belleza text-5xl">Hello, Admin!</h1>

      <div className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <p className="font-belleza text-2xl">Branches</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hover:underline">
              Add Branch
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-8 py-12">
              <DialogHeader>
                <DialogTitle className="text-center font-belleza text-3xl">
                  Add a New Branch
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Branch Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full gap-8">
                    <FormField
                      control={form.control}
                      name="openingTime"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Opening Time</FormLabel>
                          <FormControl>
                            <TimePicker
                              granularity="second"
                              onChange={(e) => {
                                const hour = e.hour.toString().padStart(2, "0");
                                const minute = e.minute
                                  .toString()
                                  .padStart(2, "0");
                                const second = e.second
                                  .toString()
                                  .padStart(2, "0");
                                field.onChange(`${hour}:${minute}:${second}`);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="closingTime"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Closing Time</FormLabel>
                          <FormControl>
                            <TimePicker
                              granularity="second"
                              onChange={(e) => {
                                const hour = e.hour.toString().padStart(2, "0");
                                const minute = e.minute
                                  .toString()
                                  .padStart(2, "0");
                                const second = e.second
                                  .toString()
                                  .padStart(2, "0");
                                field.onChange(`${hour}:${minute}:${second}`);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Add all field for services */}
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="text-base">Services</FormLabel>

                        <div className="flex justify-between">
                          {services?.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value.includes(
                                          service.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                service.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== service.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormControl>
                      <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                        className="mt-6 rounded-full px-8 lg:px-16"
                      >
                        Add Branch
                      </Button>
                    </FormControl>
                  </FormItem>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {branchServices && branchServices.length > 0 ? (
            branchServices
              .slice(startIdx, endIdx)
              .map((branchService) => (
                <BranchCard key={branchService.id} branch={branchService} />
              ))
          ) : (
            <p>You have no current branches.</p>
          )}
        </div>
      </div>

      <div className="flex grow flex-col justify-end">
        <ClientPagination total={total} totalPerPage={totalPerPage} />
      </div>
    </main>
  );
}

export default AdminDashboard;
