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
import { signInSchema } from "@/lib/zod-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SignInFormValues = z.infer<typeof signInSchema>;

function SignInCard({ session }: { session: Session | null }) {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  async function onSubmit(data: SignInFormValues) {
    // Show loading toast
    const loadingToast = toast.loading("Signing in...", {
      description: "Please wait for a while",
      duration: Infinity,
    });

    // Destructure form data
    const { email, password } = data;

    // Create form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Make API request
    const res = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (!res?.ok) {
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
    router.refresh();
  }

  if (session) {
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-[600px] py-8" data-aos="fade-up">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline">
                Sign-up here
              </Link>
            </p>

            <FormItem className="self-center">
              <FormControl>
                <Button type="submit" className="rounded-full px-8 lg:px-16">
                  Sign In
                </Button>
              </FormControl>
            </FormItem>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
