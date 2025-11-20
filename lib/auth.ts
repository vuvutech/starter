/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from "better-auth";
import {

  admin,
  magicLink,
} from "better-auth/plugins";


import { resend } from "./email/resend";
import { nextCookies } from "better-auth/next-js";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./db";
import { baseUrl } from "./metadata";
const from = process.env.BETTER_AUTH_EMAIL || "notifications@costrad.org";



export const auth = betterAuth({
  appName: "College of Sustainable Transformation and Development",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),


  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.error("Auth error:", error);
    },
    errorURL: "/auth/error",
  },

  baseURL: baseUrl.toString(),


  rateLimit: {
    enabled: true,
    max: 100,
    duration: 60,
  },
  trustedOrigins: [
    "https://www.costrad.org",
    "https://costrad.org",
    "https://www.costrad.net",
    "https://costrad.net",
    "http://localhost:3000",
  ],



  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },

  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
        await resend.emails.send({
          from,
          to: email,
          subject: "Sign in to COSTrAD",
          html: `<p>Hello,</p>
                 <p>Click the link below to sign in:</p>
                 <a href="${url}">Sign in</a>
                 <p>If you did not request this, please ignore this email.</p>`,
        });
      }
    }),

    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN", "SUPERADMIN"],
      adminPaths: ["/admin", "/settings"],
      defaultBanReason: "Spamming",
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
      defaultBanExpiresIn: 60 * 60 * 24 * 365, // 365 days
      bannedUserMessage: "Account suspended For Violating Our Terms of Service",
    }),




    nextCookies(),
  ],
});

