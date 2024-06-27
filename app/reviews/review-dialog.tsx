"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewsSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { Session } from "next-auth";
import { Ratings } from "@/components/ui/ratings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type ReviewFormValues = z.infer<typeof reviewsSchema>;

function ReviewDialog({ session }: { session: Session | null }) {
  const isDisabled = session === null;

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewsSchema),
    defaultValues: { name: session?.name, rating: 0 },
  });

  async function onSubmit(data: ReviewFormValues) {
    // Show loading toast
    const loadingToast = toast.loading("Submitting...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Destructure form data
    const { name, comment, rating } = data;

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("rating", String(rating));

    // Make API request
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: formData,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to post a review", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Review made successfully", {
      description: "Thank you for your review",
    });

    // Close the dialog
    setOpen(false);

    // Refresh the page
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="self-end" disabled={isDisabled}>
        <Button className="rounded-full px-12" disabled={isDisabled}>
          + Review
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 py-12">
        <DialogHeader>
          <DialogTitle className="text-center font-belleza text-3xl">
            Write Your Review
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4"
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

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center py-6">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Ratings
                      rating={field.value}
                      totalStars={5}
                      size={32}
                      onRatingClick={(newRating) => {
                        form.setValue("rating", newRating);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormControl>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="rounded-full px-8 lg:px-16"
                >
                  Add Review
                </Button>
              </FormControl>
            </FormItem>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDialog;
