"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectionSchema, SectionSchemaType } from "../zod-schemas";
import { z } from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { RequiredLabelIcon } from "@/components/global/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actionToast } from "@/utils/helperFuncs";
import { CourseSectionStatus, courseSectionStatuses } from "@/drizzle/schema";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { createSection, updateSection } from "../actions";

export function SectionForm({
  section,
  courseId,
  onSuccess,
}: {
  section?: {
    id: string;
    name: string;
    status: CourseSectionStatus;
  };
  courseId: string;
  onSuccess?: () => void;
}) {
  const form = useForm<SectionSchemaType>({
    resolver: zodResolver(sectionSchema),
    defaultValues: section ?? {
      name: "",
      status: "public",
    },
  });

  async function onSubmit(values: SectionSchemaType) {
    const action =
      section == null
        ? createSection.bind(null, courseId)
        : updateSection.bind(null, section.id);
    const data = await action(values);
    actionToast(data);
    if (!data.error) onSuccess?.();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col @container"
    >
      <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                <RequiredLabelIcon />
                Name
              </FieldLabel>
              <FieldContent>
                <Input {...field} />
              </FieldContent>
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FieldContent>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FieldContent>
                <SelectContent>
                  {courseSectionStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
      </div>
      <div className="self-end">
        <Button disabled={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
