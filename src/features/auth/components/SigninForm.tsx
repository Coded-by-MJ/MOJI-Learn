"use client";

import Link from "next/link";

import { useRouter } from "nextjs-toploader/app";
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
import { signInSchema, SignInSchemaType } from "../zod-schemas";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { LogoImage } from "@/components/global/Logo";
import EmailVerificationSent from "./EmailVerificationSent";

function SignInForm() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const { control, handleSubmit } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchemaType) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async (ctx) => {
          toast.success("Successfully signed in.");
          push(`/`);
        },
        onError: (ctx) => {
          setIsLoading(false);
          console.log(ctx);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            setShowVerifyEmail(true);
          } else {
            toast.error(
              ctx.error.message ?? "Something went wrong, try again later."
            );
          }
        },
      }
    );
  };
  if (showVerifyEmail)
    return <EmailVerificationSent setShowVerifyEmail={setShowVerifyEmail} />;

  return (
    <div className="w-full max-w-[500px] flex gap-6 py-10 flex-col">
      <div className="w-full flex gap-6 flex-col p-6 rounded-[1.25rem] border border-[#E6E8EC80] bg-muted shadow-sm">
        <div className="flex w-full flex-col gap-2">
          <LogoImage isLink />
          <h1 className="text-secondary  font-bold text-2xl">
            Welcome To MOJI Learn
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full  justify-center  flex-col gap-4"
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel className="text-secondary">Email</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Email Address"
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
                  <div className="flex justify-between items-center w-full">
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : undefined}
                      className="text-xs"
                    />
                    <Link
                      className="capitalize ml-auto text-secondary hover:underline text-xs underline-offset-2"
                      href="/forgot-password"
                    >
                      forgot password?
                    </Link>
                  </div>
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
                <span>Sign In</span>
                <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform duration-200" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-secondary/80">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-secondary hover:underline underline-offset-2"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default SignInForm;
