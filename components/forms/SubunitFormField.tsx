import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SubunitFormField = ({ form }: { form: any }) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subunits",
  });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-4 flex-wrap">
          {["name", "brandname", "modelname", "serialNumber", "assetTag"].map((fieldName, idx) => (
            <FormField
              key={idx}
              control={control}
              name={`subunits.${index}.${fieldName}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='paragraph-semibold text-dark400_light800'>
                    {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      className='no-focus background-light900_dark300 light-border-2 text-dark300_light700 border'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
          ))}
          <Button className="primary-gradient min-h-[40px] px-4 py-3 !text-light-900" type="button" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button 
        className="primary-gradient w-1/3 px-4 py-4 !text-light-900 mt-6" 
        type="button" 
        onClick={() => append({ name: "", brandname: "", modelname: "", serialNumber: "", assetTag: "" })}
      >
        Add Subunit
      </Button>
    </div>
  );
};

export default SubunitFormField;