import { useFieldArray, useWatch, type Control } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Input } from "./ui/input";
import type { FormData } from "./PlayerForm";
import { useQuery } from "@tanstack/react-query";
import { fetchContrabands } from "@/api/api";
import { Skeleton } from "./ui/skeleton";

interface ContrabandsSelect {
  control: Control<FormData>;
  name: keyof FormData;
  handleInputChange: (field: { onChange: (value: string) => void }) => void;
}

export const ContrabandsSelect = ({
  control,
  name,
  handleInputChange,
}: ContrabandsSelect) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["contrabands"],
    queryFn: fetchContrabands,
  });

  console.log("Contrabands ", data);

  const watchedValue = useWatch({ control, name: "contrabands" });

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  if (error) return <p>Error: {error.message}</p>;

  if (isLoading) {
    return <Skeleton className="h-8" aria-label="Loading contrabands" />;
  }

  const contrabandOptions = data.contrabands;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Contrabands</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ contrabandName: "", quantity: 1 })}
        >
          Add Contraband
        </Button>
      </div>

      {fields.map((field, index) => {
        const usedContrabands = (watchedValue || [])
          .map((c, i) => (i !== index ? c.contrabandName : ""))
          .filter(Boolean);

        return (
          <div
            key={field.id}
            className="flex items-end gap-2 mb-4 p-4 border rounded-lg min-w-0"
          >
            <FormField
              control={control}
              name={`contrabands.${index}.contrabandName`}
              render={({ field }) => (
                <FormItem className="flex-1 min-w-0">
                  <FormLabel>Contraband Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue placeholder="Select contraband" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contrabandOptions
                        .filter(
                          (contraband) =>
                            !usedContrabands.includes(contraband.name),
                        )
                        .map((contraband) => (
                          <SelectItem
                            key={contraband.name}
                            value={contraband.name}
                            className="truncate"
                          >
                            <span className="truncate">
                              {contraband.name} (Score: {contraband.score}
                              {contraband.resourceBonus &&
                                contraband.resourceType &&
                                `, +${contraband.resourceBonus} ${contraband.resourceType}`}
                              )
                            </span>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`contrabands.${index}.quantity`}
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={String(field.value ?? "")}
                      placeholder="1"
                      type="number"
                      min={1}
                      max={99}
                      onChange={handleInputChange(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        );
      })}
    </div>
  );
};
