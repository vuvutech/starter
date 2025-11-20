// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import {

  adminClient,
  magicLinkClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";
import { baseUrl } from "./metadata";

export const client = createAuthClient({
  baseURL: `${baseUrl}` || "http://localhost:3000",
  plugins: [
    magicLinkClient(),
    adminClient(),


  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const {
  admin,
  signUp,
  signIn,
  signOut,
  resetPassword,
  verifyEmail,
  getSession,
  useSession,

} = client;