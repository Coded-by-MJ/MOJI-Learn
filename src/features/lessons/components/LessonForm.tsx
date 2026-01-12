"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldContent,
  FieldError,
  Field,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { RequiredLabelIcon } from "@/components/global/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actionToast } from "@/utils/helperFuncs";
import { LessonStatus, lessonStatuses } from "@/drizzle/schema";
import { lessonSchema, LessonType } from "../zod-schemas";
import { Textarea } from "@/components/ui/textarea";
import { createLesson, updateLesson } from "../actions";
import YouTubeVideoPlayer from "./YoutubeVideoPlayer";

function LessonForm({
  sections,
  defaultSectionId,
  onSuccess,
  lesson,
}: {
  sections: {
    id: string;
    name: string;
  }[];
  onSuccess?: () => void;
  defaultSectionId?: string;
  lesson?: {
    id: string;
    name: string;
    status: LessonStatus;
    youtubeVideoId: string;
    description: string | null;
    sectionId: string;
  };
}) {
  const form = useForm<LessonType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson?.name ?? "",
      status: lesson?.status ?? "public",
      youtubeVideoId: lesson?.youtubeVideoId ?? "",
      description: lesson?.description ?? "",
      sectionId: lesson?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? "",
    },
  });
  const videoId = useWatch({ control: form.control, name: "youtubeVideoId" });

  async function onSubmit(values: LessonType) {
    const action =
      lesson == null ? createLesson : updateLesson.bind(null, lesson.id);
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
          name="youtubeVideoId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                <RequiredLabelIcon />
                YouTube Video Id
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
          name="sectionId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Section</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FieldContent>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FieldContent>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  {lessonStatuses.map((status) => (
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
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <FieldContent>
              <Textarea
                className="min-h-20 resize-none"
                {...field}
                value={field.value ?? ""}
              />
            </FieldContent>
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
            />
          </Field>
        )}
      />
      <div className="self-end">
        <Button disabled={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </div>
      {videoId && (
        <div className="aspect-video">
          <YouTubeVideoPlayer videoId={videoId} />
        </div>
      )}
    </form>
  );
}

export default LessonForm;
