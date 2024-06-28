"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BranchWithServices } from "@/types/branchservice";
import { convertTo12HourFormat } from "@/lib/time";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/ui/datetime-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { branchServiceSchema } from "@/lib/zod-schema";
import { TimeValue } from "react-aria";
import { Services } from "@/types/service";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type BranchServiceFormValues = z.infer<typeof branchServiceSchema>;

function BranchCard({
  branch,
  services,
}: {
  branch: BranchWithServices;
  services: Services | null;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<BranchServiceFormValues>({
    resolver: zodResolver(branchServiceSchema),
    defaultValues: {
      name: branch.name,
      location: branch.location,
      openingTime: branch.openingTime,
      closingTime: branch.closingTime,
      services: branch.services.map((service) => service.serviceId),
    },
  });

  const router = useRouter();

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
    const res = await fetch(`/api/branches/${branch.id}`, {
      method: "PATCH",
      body: formData,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to update branch", {
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

    // Make API request to delete branch services
    const deleteRes = await fetch(`/api/branchservice/${branch.id}`, {
      method: "DELETE",
    });

    // Check if the response is successful
    if (!deleteRes.ok) {
      // Show error toast
      toast.error("Failed to delete branch/services", {
        description: "Please try again",
      });
      return;
    }

    // Make API request for each service using Promise.all
    // Create form data for services
    let formDatas: FormData[] = [];
    services.forEach((service) => {
      const formData = new FormData();
      formData.append("branchId", branch.id);
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
      toast.error("Failed to update branch/services", {
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

  async function onDelete() {
    // Show loading toast
    const loadingToast = toast.loading("Deleting...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Make API request
    const res = await fetch(`/api/branches/${branch.id}`, {
      method: "DELETE",
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to delete branch", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Branch deleted successfully", {
      description: "Thank you for your service",
    });

    // Close the dialog
    setOpen(false);

    // Refresh the page
    router.refresh();
  }

  return (
    <Card className="w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="line-clamp-1">{branch.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="line-clamp-1">Location: {branch.location}</p>

        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
            form.reset();
          }}
        >
          <DialogTrigger className="w-full">
            <Button className="w-full">Edit Branch</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-8 py-12">
            <DialogHeader className="relative">
              <Button
                className="absolute -top-6 left-0 size-10 p-2"
                variant={"destructive"}
                aria-label="Delete Button"
                onClick={onDelete}
                disabled={form.formState.isSubmitting}
              >
                <Trash2 className="text-foreground" />
                <span className="sr-only">Delete</span>
              </Button>
              <DialogTitle className="text-center font-belleza text-3xl">
                Branch Details
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
                        <Input type="text" placeholder="Location" {...field} />
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
                            defaultValue={
                              {
                                hour: parseInt(field.value.split(":")[0]),
                                minute: parseInt(field.value.split(":")[1]),
                                second: parseInt(field.value.split(":")[2]),
                              } as TimeValue
                            }
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
                            defaultValue={
                              {
                                hour: parseInt(field.value.split(":")[0]),
                                minute: parseInt(field.value.split(":")[1]),
                                second: parseInt(field.value.split(":")[2]),
                              } as TimeValue
                            }
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
                                      checked={field.value.includes(service.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              service.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== service.id,
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
                      Edit Branch
                    </Button>
                  </FormControl>
                </FormItem>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default BranchCard;
