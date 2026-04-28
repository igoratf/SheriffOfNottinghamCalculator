import { useFieldArray, useWatch, type Control } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type { FormData } from "./PlayerForm";
import { useQuery } from "@tanstack/react-query";
import { fetchContrabands } from "@/api/api";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Contraband } from "@/utils/types";

interface ContrabandsSelect {
  control: Control<FormData>;
}

export const ContrabandsSelect = ({ control }: ContrabandsSelect) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["contrabands"],
    queryFn: fetchContrabands,
  });

  const watchedValue = useWatch({ control, name: "contrabands" }) || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contrabands",
  });

  if (error) return <p>Error: {error.message}</p>;

  if (isLoading) {
    return <Skeleton className="h-8" aria-label="Loading contrabands" />;
  }

  const contrabandOptions = data?.contrabands || [];

  const formatContraband = (contraband: Contraband) => {
    return (
      `${contraband.name} (Score: ${contraband.score}` +
      `${contraband.resourceType && contraband.resourceBonus ? `, +${contraband.resourceBonus} ${contraband.resourceType}` : ""})`
    );
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Contrabands</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ contraband: undefined, quantity: 1 })}
        >
          Add Contraband
        </Button>
      </div>

      {fields.map((field, index) => {
        console.log("FIELD ", field);
        const currentSelection = watchedValue[index]?.contraband?.name;

        const filteredOptions = contrabandOptions.filter((option) => {
          const isUsedElsewhere = watchedValue.some(
            (item, i) => i !== index && item?.contraband?.name === option.name,
          );

          // Keep the  option if it's NOT used elsewhere OR if it is the current selection
          return !isUsedElsewhere || option.name === currentSelection;
        });

        return (
          <div
            key={field.id}
            className="flex items-start gap-2 mb-4 p-4 border rounded-lg min-w-0"
          >
            <FormField
              control={control}
              name={`contrabands.${index}.contraband`}
              render={({ field }) => (
                <FormItem className="flex-1 min-w-0">
                  <FormLabel>Contraband Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selected = contrabandOptions.find(
                        (c) => c.name === value,
                      );
                      field.onChange(selected);
                    }}
                    value={field.value?.name ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue placeholder="Select contraband" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredOptions.map((contraband) => {
                        return (
                          <SelectItem
                            key={contraband.name}
                            value={contraband.name}
                            className="truncate"
                          >
                            <span className="truncate">
                              {formatContraband(contraband)}
                            </span>
                          </SelectItem>
                        );
                      })}
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
                      value={(field.value as string) ?? "1"}
                      placeholder="1"
                      type="number"
                      min={1}
                      max={99}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-6"
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
