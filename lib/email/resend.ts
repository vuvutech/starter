import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            react: html,
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}
