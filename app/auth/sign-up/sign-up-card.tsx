"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/zod-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SignUpFormValues = z.infer<typeof signUpSchema>;

function SignUpCard({ session }: { session: Session | null }) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  async function onSubmit(data: SignUpFormValues) {
    // Show loading toast
    const loadingToast = toast.loading("Signing up...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Destructure form data
    const { name, email, phone, password } = data;

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    // Make API request
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res.ok) {
      // Show error toast
      toast.error("Failed to sign up", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Signed up successfully", {
      description: "Wait for signin...",
    });

    // Make API request
    const response = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    });

    if (!response?.ok) {
      // Show error toast
      toast.error("Failed to sign in", {
        description: "Please try again",
      });
      return;
    }

    // Show success toast
    toast.success("Signed in successfully", {
      description: "Welcome to SEA Salon",
    });

    // Redirect to dashboard page
    router.push("/dashboard");
  }

  if (session) {
    router.push("/dashboard");
  }

  return (
    <Card className="w-full max-w-[600px] py-8">
      <CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p>
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="underline">
                Sign-in here
              </Link>
            </p>

            <FormItem className="self-center">
              <FormControl>
                <Button type="submit" className="rounded-full px-8 lg:px-16">
                  Sign Up
                </Button>
              </FormControl>
            </FormItem>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
