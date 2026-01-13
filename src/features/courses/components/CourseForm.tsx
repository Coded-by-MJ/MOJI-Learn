"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { courseSchema, CourseSchemaType } from "../zod-schemas";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Controller } from "react-hook-form";
import { RequiredLabelIcon } from "@/components/global/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCourse, updateCourse } from "../actions";
import { actionToast } from "@/utils/helperFuncs";

export function CourseForm({
  course,
}: {
  course?: {
    id: string;
    name: string;
    description: string;
  };
}) {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ?? {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: CourseSchemaType) {
    const action =
      course == null ? createCourse : updateCourse.bind(null, course.id);
    const data = await action(values);
    actionToast(data);
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col w-full  items-center justify-center"
    >
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
              className="text-xs"
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>
              <RequiredLabelIcon />
              Description
            </FieldLabel>
            <FieldContent>
              <Textarea className="min-h-20 resize-none" {...field} />
            </FieldContent>
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
              className="text-xs"
            />
          </Field>
        )}
      />
      <div className="self-end">
        <Button disabled={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
