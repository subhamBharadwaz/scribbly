"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { useSession } from "@/app/features/auth/auth-client";
import { env } from "@/env";

function getPostHogClient() {
  if (typeof window === "undefined") return posthog;

  if (!posthog.__loaded) {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.i.posthog.com",
    });
  }

  return posthog;
}

export function CSPostHogProvider({ children }) {
  const client = getPostHogClient();

  return (
    <PostHogProvider client={client}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession() as any;

  useEffect(() => {
    if (session?.user) {
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    } else if (!isPending) {
      posthog.reset();
    }
  }, [isPending, session]);
  return children;
}
