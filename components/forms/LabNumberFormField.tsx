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

// Sample lab numbers - will be replaced with DB fetch later
const labNumbers = [
  { value: "hawthorn-2-18", label: "Hawthorn 2.18" },
  { value: "hawthorn-2-19", label: "Hawthorn 2.19" },
  { value: "hawthorn-3-01", label: "Hawthorn 3.01" },
  { value: "keble-1-12", label: "Keble 1.12" },
  { value: "keble-2-05", label: "Keble 2.05" },
  { value: "merton-1-04", label: "Merton 1.04" },
  { value: "merton-2-11", label: "Merton 2.11" },
  { value: "newton-1-01", label: "Newton 1.01" },
  { value: "newton-g-15", label: "Newton G.15" },
  { value: "other", label: "Other" }
];

// Lab Number form field component
const LabNumberFormField = ({ form }: { form: any }) => {
  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    // Check if "other" is selected when field value changes
    const labValue = form.getValues("labNumber");
    setIsOther(labValue === "other");
  }, [form.watch("labNumber")]);

  return (
    <>
      <FormField
        control={form.control}
        name="labNumber"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className="paragraph-semibold text-dark400_light800">Lab Number <span className='text-primary-500'>*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setIsOther(value === "other");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] w-full border">
                  <SelectValue placeholder="Select a lab number" />
                </SelectTrigger>
                <SelectContent>
                  {labNumbers.map((lab) => (
                    <SelectItem key={lab.value} value={lab.value}>
                      {lab.label}
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
          name="customLabNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 mt-4">
              <FormLabel className="paragraph-semibold text-dark400_light800">Custom Lab Number</FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="e.g. Hawthorn 2.18"
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

export default LabNumberFormField;