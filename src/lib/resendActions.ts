import {
  ResetPasswordEmailTemplate,
  WelcomeAccountEmailTemplate,
} from "@/components/global/EmailTemplate";
import { Resend } from "resend";
import { env } from "@/data/env/server";

const resend = new Resend(env.RESEND_API_KEY);
const fromEmail = env.RESEND_FROM_EMAIL;

const renderError = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("unknown error occurred");
  }
  return {
    message: error instanceof Error ? error.message : "An error occurred",
    type: "error",
  };
};
export const sendResetPasswordEmailAction = async ({
  email,
  firstName,
  link,
}: {
  firstName: string;
  link: string;
  email: string;
}) => {
  try {
    const { error } = await resend.emails.send({
      from: `MOJI Learn <${fromEmail}>`,
      to: email,
      react: ResetPasswordEmailTemplate({
        name: firstName,
        link: link,
      }),
      subject: "Reset Your Password",
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    renderError(error);
    throw new Error("Error sending email");
  }
};

export const sendAccountDetailsEmailAction = async ({
  email,
  name,
  link,
}: {
  name: string;
  link: string;
  email: string;
}) => {
  try {
    const { error } = await resend.emails.send({
      from: `MOJI Learn <${fromEmail}>`,
      to: email,
      subject: "Welcome to MOJI Learn — Your Account Details",

      react: WelcomeAccountEmailTemplate({
        name,
        link,
        email,
      }),
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    renderError(error);
    throw new Error("Error sending email");
  }
};
