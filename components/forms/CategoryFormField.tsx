import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// Sample categories - will be replaced with DB fetch later
const categories = [
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "biology", label: "Biology" },
  { value: "mathematics", label: "Mathematics" },
  { value: "computer-science", label: "Computer Science" },
  { value: "economics", label: "Economics" },
  { value: "history", label: "History" },
  { value: "literature", label: "Literature" },
  { value: "psychology", label: "Psychology" },
  { value: "sociology", label: "Sociology" },
  { value: "other", label: "Other" }
];

// Category form field component
const CategoryFormField = ({ form }: { form: any }) => {
  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    // Check if "other" is selected when field value changes
    const categoryValue = form.getValues("category");
    setIsOther(categoryValue === "other");
  }, [form.watch("category")]);

  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className="paragraph-semibold text-dark400_light800">Category <span className='text-primary-500'>*</span></FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setIsOther(value === "other");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] w-full border">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Show input field when "Other" is selected */}
      {isOther && (
        <FormField
          control={form.control}
          name="customCategory"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 mt-4">
              <FormLabel className="paragraph-semibold text-dark400_light800">Custom Category</FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Enter your category"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CategoryFormField; 