"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { signUpSchema, SignUpSchemaType } from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { LogoImage } from "../global/Logo";
import EmailVerificationSent from "./EmailVerificationSent";
import { getDefaultImage } from "@/utils/funcs";
import { env } from "@/data/env/client";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const { control, handleSubmit, setError } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    await authClient.signUp.email(
      {
        email: values.email.toLowerCase().trim(),
        name: `${values.firstName} ${values.lastName}`,
        password: values.password,
        image: getDefaultImage(`${values.firstName} ${values.lastName}`),
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          toast.success("Email Verification Link Sent.");
          setShowVerifyEmail(true);
        },
        onError: (ctx) => {
          console.log(ctx);
          if (ctx.error.code === "PASSWORD_COMPROMISED") {
            setError("password", {
              type: "manual",
              message:
                ctx.error.message ??
                "This password has been compromised. Please choose a different password.",
            });
          } else {
            toast.error(
              ctx.error.message ?? "Something went wrong, try again later."
            );
          }
        },
      }
    );

    setIsLoading(false);
  };

  if (showVerifyEmail)
    return <EmailVerificationSent setShowVerifyEmail={setShowVerifyEmail} />;

  return (
    <div className="w-full max-w-[500px] flex gap-6 py-10 flex-col">
      <div className="w-full flex gap-6 flex-col p-6 rounded-[1.25rem] border border-[#E6E8EC80] bg-muted shadow-sm">
        <div className="flex w-full flex-col gap-2">
          <LogoImage isLink />
          <h1 className="text-secondary font-bold text-2xl">
            Create Your Account
          </h1>
          <p className="text-sm text-secondary/80">
            Join MOJI Learn to start your learning journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full justify-center flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="text-secondary">First Name</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="First Name"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : undefined}
                      className="text-xs"
                    />
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel className="text-secondary">Last Name</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="Last Name"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : undefined}
                      className="text-xs"
                    />
                  </FieldContent>
                </Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="text-secondary">Email</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : undefined}
                    className="text-xs"
                  />
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="text-secondary">Password</FieldLabel>
                <FieldContent>
                  <div className="w-full relative">
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="h-10 pr-10"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 flex items-center justify-center"
                    >
                      {showPassword ? (
                        <EyeOff className="size-[1.125rem] text-secondary" />
                      ) : (
                        <Eye className="size-[1.125rem] text-secondary" />
                      )}
                    </button>
                  </div>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : undefined}
                    className="text-xs"
                  />
                </FieldContent>
              </Field>
            )}
          />

          <Button
            size={"lg"}
            disabled={isLoading}
            className="gap-2 group text-secondary rounded-md h-11 w-full font-bold text-base bg-primary"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform duration-200" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-secondary/80">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-secondary hover:underline underline-offset-2"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
