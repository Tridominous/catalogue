"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EquipmentSchema } from "@/lib/validations"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import CategoryFormField from "./CategoryFormField"
import LabNumberFormField from "./LabNumberFormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import SubunitFormField from "./SubunitFormField"

import { useState } from "react"
import FileUploader from "../FileUploader"


const EquipmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
    // 1. Define your form.
  const form = useForm<z.infer<typeof EquipmentSchema>>({
    resolver: zodResolver(EquipmentSchema),
    defaultValues: {
        name: "",
        brandname: "",
        modelname: "",
        serialNumber: "",
        assetTag: "",
        subunits: [],
        labNumber: "",
        customLabNumber: "",
        labName: "",
        team: "",
        serviceDate: new Date(),
        category: "",
        customCategory: "",
        comment: "",
        imgUrl: "" as string | File | undefined,
        amount: 0,

    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EquipmentSchema>) {
    try {
      setIsSubmitting(true);
      
      // Create final data object with conditional replacement of "other" values
      const finalData = {
        ...values,
        category: values.category === "other" ? values.customCategory : values.category,
        labNumber: values.labNumber === "other" ? values.customLabNumber : values.labNumber,
      };
      
      // Remove redundant fields
      delete finalData.customCategory;
      delete finalData.customLabNumber;
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.entries(finalData).forEach(([key, value]) => {
        if (key === 'imgUrl' && value instanceof File) {
          formData.append('file', value);
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value as string);
        }
      });
      
      // Here you would typically send the formData to your API
      // await fetch('/api/equipment', { method: 'POST', body: formData });
      
      console.log(finalData);
      // console.log("Form submitted successfully");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could set an error state here to display to the user
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col mt-6'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Equipment Name <span className='text-primary-500'>*</span></FormLabel>
              <FormControl className='mt-3.5'>
                <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='UV/VIS Spectrophotometer'
                    {...field} 
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Give the specific name of the equipment.
              </FormDescription>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandname"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Brand Name</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='ThermoScientific'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modelname"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Model</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='Evolution 60S'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Serial Number</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='123456789'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assetTag"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>DMU Asset Tag </FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='056789'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className='paragraph-semibold text-dark400_light800'>Service Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategoryFormField form={form} />

        <SubunitFormField form={form} />
        
        <LabNumberFormField form={form} />

        <FormField
          control={form.control}
          name="labName"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Lab Name</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='Pharmaceutics Compounding Laboratory'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
            name="team"
            render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                    <FormLabel className='paragraph-semibold text-dark400_light800'>Team <span className='text-primary-500'>*</span></FormLabel>
                    <FormControl className='mt-3.5'>
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'>
                                <SelectValue placeholder="select a team" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="research">Research</SelectItem>
                                <SelectItem value="teaching">Teaching</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage  className='text-red-500'/>
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Amount</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    type="number"
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
            )}
          />

        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Comment</FormLabel>
              <FormControl className='mt-3.5'>
              <Input 
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    placeholder='Replaced light source recently.'
                    {...field} 
                />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
          />


        <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 align-center'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Upload an image</FormLabel>
              <FormControl className='mt-3.5'>
              <FileUploader 
                value={field.value as string} 
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              </FormControl>
              <FormMessage  className='text-red-500'/>
            </FormItem>
          )}
        />
          
          <div className="flex justify-center">
              <Button
                  className="primary-gradient min-h-[46px] px-16 py-3 !text-light-900 justify-center"
                  type="submit"
                  disabled={isSubmitting}
              >
                  {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
          </div>

        
      </form>
    </Form>
  )
}

export default EquipmentForm