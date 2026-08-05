"use client";

import { useState } from "react";

import { signIn } from "@/app/features/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

type AuthFormMode = "sign-in" | "sign-up";

interface AuthFormProps {
  mode: AuthFormMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      await signIn.social({
        provider,
        callbackURL: "/journal",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign in failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoadingProvider(null);
    }
  };

  return (
    <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-md shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isSignUp ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {isSignUp
            ? "Sign up with a social provider to start writing."
            : "Sign in with your preferred social account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <Button
          variant="outline"
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialSignIn("google")}
          className="relative w-full h-11 justify-center gap-2 border bg-background hover:bg-muted/80 font-medium transition-all duration-200"
        >
          {loadingProvider === "google" ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.google className="size-4" />
          )}
          Continue with Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialSignIn("github")}
          className="relative w-full h-11 justify-center gap-2 border bg-background hover:bg-muted/80 font-medium transition-all duration-200"
        >
          {loadingProvider === "github" ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.gitHub className="size-4" />
          )}
          Continue with GitHub
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed px-4">
          By continuing, you agree to Scribbly's{" "}
          <a href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
