"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/api/login/login";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Dashboard() {
  const { mutateAsync } = useSignIn();
  const EmailRef = useRef<HTMLInputElement>(null);
  const PassRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Guard to access localStorage only on the client
    const adminData = localStorage.getItem("admin");
    console.log(adminData); // Example, remove if unnecessary
  }, []);

  async function handleSignIn() {
    const email = EmailRef.current?.value.trim();
    const password = PassRef.current?.value.trim();

    // Validation
    if (!email || !password) {
      return alert("Please fill out all fields.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return alert("Invalid email format.");
    }

    // API call with error handling
    setLoading(true);
    try {
      const response = await mutateAsync({ email, password });
      console.log(response);

      // Store user data securely (avoid sensitive info)
      localStorage.setItem("admin", JSON.stringify(response));

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
        {/* Left Column - Login Form */}
        <div className="flex pt-40  h-11">
          <div className="mx-auto grid w-[350px]  h-[400px]">
            <div className=" text-center gap-4 flex flex-col">
              <h1 className="text-5xl font-bold text-[#000]">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-6">
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  ref={EmailRef}
                  className="border-2 border-[#bbb] p-[10px] text-[16px] focus:border-2 focus:border-[#2ba5ec] outline-none transition-all duration-300 ease-in-out"
                />
              </div>
              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-[#FF3E3E] text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="***"
                  required
                  ref={PassRef}
                  className="border-2 border-[#bbb] p-[10px] text-[16px] focus:border-2 focus:border-[#2ba5ec] outline-none transition-all duration-300 ease-in-out"
                />
              </div>
              {/* Login Button */}
              <Button
                type="submit"
                className="bg-[#2ba5ec] text-white text-xl py-3 px-8 rounded-md shadow-md hover:bg-[#2ba5ec] focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              {/* Google Login Button */}
            </div>
            {/* Signup Link */}
          </div>
        </div>
        {/* Right Column - Cover Image */}
        <div className="hidden bg-muted lg:block">
          <Image
            src="/logo.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale brightness-[0.8]"
            priority
          />
        </div>
      </div>
    </>
  );
}
