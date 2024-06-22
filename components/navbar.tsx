"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import SEALogo from "./svg/sea-logo";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const isLoggedIn = session.status === "authenticated";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background px-16 py-4">
      <nav className="flex justify-between">
        <Link href="/" className="flex items-center">
          <SEALogo
            className={cn("h-fit w-16 fill-foreground")}
            aria-label="SEA Logo"
          />
          <p className="font-belleza text-3xl">SEA SALON</p>
        </Link>
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger className="block lg:hidden">
              <Menu
                className="size-8 hover:cursor-pointer"
                aria-label="Menu Logo"
              />
            </SheetTrigger>
            <SheetContent className="w-3/5 sm:w-full">
              <SheetHeader>
                {theme === "light" ? (
                  <Button
                    className="size-10 border-secondary p-2"
                    variant={"outline"}
                    onClick={() => setTheme("dark")}
                  >
                    <Sun className="size-full" aria-label="Sun Logo" />
                  </Button>
                ) : (
                  <Button
                    className="size-10 border-secondary p-2"
                    variant={"outline"}
                    onClick={() => setTheme("light")}
                  >
                    <Moon className="size-full" aria-label="Moon Logo" />
                  </Button>
                )}
              </SheetHeader>

              <div className="pt-16">
                <ul className="flex flex-col items-center gap-8 text-lg">
                  <li>
                    <Link href="/reservation">Reservation</Link>
                  </li>
                  <li>
                    <Link href="/reviews">Reviews</Link>
                  </li>
                  <li>
                    {!isLoggedIn ? (
                      <Link href="/auth/sign-in">
                        <Button className="rounded-full px-8 text-base">
                          Sign In
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/dashboard">Dashboard</Link>
                    )}
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>

          <ul className="hidden items-center gap-8 text-lg lg:flex">
            <li>
              <Link href="/reservation">Reservation</Link>
            </li>
            <li>
              <Link href="/reviews">Reviews</Link>
            </li>
            <li>
              {theme === "light" ? (
                <Button
                  className="size-10 border-secondary p-2"
                  variant={"outline"}
                  onClick={() => setTheme("dark")}
                >
                  <Sun className="size-full" aria-label="Sun Logo" />
                </Button>
              ) : (
                <Button
                  className="size-10 border-secondary p-2"
                  variant={"outline"}
                  onClick={() => setTheme("light")}
                >
                  <Moon className="size-full" aria-label="Moon Logo" />
                </Button>
              )}
            </li>
            <li>
              {!isLoggedIn ? (
                <Link href="/auth/sign-in">
                  <Button className="rounded-full px-8 text-base">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">Dashboard</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
