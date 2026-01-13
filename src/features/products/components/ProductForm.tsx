"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { RequiredLabelIcon } from "@/components/global/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { actionToast } from "@/utils/helperFuncs";
import { productSchema } from "../zod-schemas";
import { ProductStatus, productStatuses } from "@/drizzle/schema";
import { createProduct, updateProduct } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "@/components/global/MultiSelect";

export function ProductForm({
  product,
  courses,
}: {
  product?: {
    id: string;
    name: string;
    description: string;
    priceInDollars: number;
    imageUrl: string;
    status: ProductStatus;
    courseIds: string[];
  };
  courses: {
    id: string;
    name: string;
  }[];
}) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      name: "",
      description: "",
      courseIds: [],
      imageUrl: "",
      priceInDollars: 0,
      status: "private",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const action =
      product == null ? createProduct : updateProduct.bind(null, product.id);
    const data = await action(values);
    actionToast(data);
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col"
    >
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-start">
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
          name="priceInDollars"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                <RequiredLabelIcon />
                Price
              </FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  {...field}
                  step={1}
                  min={0}
                  onChange={(e) =>
                    field.onChange(
                      isNaN(e.target.valueAsNumber)
                        ? ""
                        : e.target.valueAsNumber
                    )
                  }
                />
              </FieldContent>
              <FieldError
                errors={fieldState.error ? [fieldState.error] : undefined}
              />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="imageUrl"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                <RequiredLabelIcon />
                Image Url
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
                  {productStatuses.map((status) => (
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
        name="courseIds"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Included Courses</FieldLabel>
            <FieldContent>
              <MultiSelect
                selectPlaceholder="Select courses"
                searchPlaceholder="Search courses"
                options={courses}
                getLabel={(c) => c.name}
                getValue={(c) => c.id}
                selectedValues={field.value}
                onSelectedValuesChange={field.onChange}
              />
            </FieldContent>
            <FieldError
              errors={fieldState.error ? [fieldState.error] : undefined}
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
