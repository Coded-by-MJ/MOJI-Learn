"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileFormSchemaType } from "../zod-schemas";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "@/features/users/actions";
import { actionToast } from "@/utils/helperFuncs";
import { Button } from "@/components/ui/button";

function ProfileForm({ name }: { name: string }) {
  const [firstName, lastName] = name.split(" ");
  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      img: undefined,
    },
  });
  async function onSubmit(values: ProfileFormSchemaType) {
    const data = await updateUserProfile(values);
    actionToast(data);
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 w-full flex flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <FieldContent>
                <Input {...field} />
              </FieldContent>
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
                className="text-xs"
              />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <FieldContent>
                <Input {...field} />
              </FieldContent>
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
                className="text-xs"
              />
            </Field>
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="self-end w-full max-w-sm"
      >
        {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
export default ProfileForm;
