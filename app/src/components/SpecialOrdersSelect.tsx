import { useFieldArray, type Control } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { PlayerFormData } from "@/utils/schemas";
import { useState } from "react";
import { Plus, TrashIcon } from "lucide-react";

interface SpecialOrdersSelect {
  control: Control<PlayerFormData>;
}

export const SPECIAL_ORDER_LIST = [
  { id: 1, name: "Apple + Crossbow", value: 6 },
  { id: 2, name: "Apple + Mead", value: 6 },
  // Yes, there are two. Who knows why?
  { id: 3, name: "Apple + Mead", value: 6 },
  { id: 4, name: "Apple + Silk", value: 6 },
  { id: 5, name: "Apple + Pepper", value: 7 },
  // Also two for this one
  { id: 6, name: "Apple + Pepper", value: 7 },
  { id: 7, name: "Bread + Mead", value: 5 },
  { id: 8, name: "Bread + Silk", value: 5 },
  { id: 9, name: "Bread + Pepper", value: 6 },
  { id: 10, name: "Cheese + Mead", value: 5 },
  { id: 11, name: "Cheese + Silk", value: 5 },
  { id: 12, name: "Cheese + Pepper", value: 6 },
  { id: 13, name: "Chicken + Silk", value: 4 },
  { id: 14, name: "Chicken + Mead", value: 5 },
  { id: 15, name: "Chicken + Pepper", value: 5 },
];

export const SpecialOrdersSelect = ({ control }: SpecialOrdersSelect) => {
  const [showSelect, setShowSelect] = useState(false);
  /*  const { data, error, isLoading } = useQuery({
    queryKey: ["specialOrders"],
    queryFn: fetchSpecialOrders,
  }); */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialOrders",
    keyName: "fieldId",
  });

  /*   if (error) return <p>Error: {error.message}</p>;

  if (isLoading) {
    return <Skeleton className="h-8" aria-label="Loading contrabands" />;
  } */

  /* const contrabandOptions = data?.contrabands || []; */

  if (!showSelect) {
    return (
      <Button variant="outline" onClick={() => setShowSelect(true)}>
        <Plus /> Add special orders
      </Button>
    );
  }

  const onSelectSpecialOrder = (id: string) => {
    const selectedOrder = SPECIAL_ORDER_LIST.find(
      (order) => order.id.toString() === id,
    );
    if (selectedOrder) {
      append(selectedOrder);
    }
  };

  const onRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const selectedOrderIndex = fields.findIndex((order) => order.id === id);
    remove(selectedOrderIndex);
  };

  const specialOrderOptions = SPECIAL_ORDER_LIST.filter((order) => {
    console.log("order ", order);
    console.log("fields ", fields);
    console.log(fields.some((field) => field.id === order.id));
    const isUsed = fields.some((field) => field.id === order.id);
    return !isUsed;
  });

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Special Orders</h3>
      </div>

      <Select value="" onValueChange={(value) => onSelectSpecialOrder(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select special orders" />
        </SelectTrigger>
        <SelectContent>
          {specialOrderOptions.map((order) => (
            <SelectItem key={order.id} value={order.id.toString()}>
              {order.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ul className="flex flex-col mt-4 space-y-2">
        {fields.map((field) => {
          return (
            <li
              key={field.id}
              className="w-full flex justify-between items-center border-1 border-gray-300 p-2 rounded-lg"
            >
              <span className="text-sm"> {field.name}</span>
              <Button
                size="icon"
                variant="outline"
                className="text-red-500 hover:text-red-600"
                onClick={(e) => onRemove(e, field.id)}
              >
                <TrashIcon />
              </Button>
            </li>
          );
        })}
      </ul>

      {/* {fields.map((field, index) => {
        const currentSelection = watchedValue[index]?.id;

        const filteredOptions = SPECIAL_ORDER_LIST.filter((option) => {
          const isUsedElsewhere = watchedValue.some(
            (item, i) =>
              i !== index && item?.id.toString() === option.id.toString(),
          );

          // Keep the  option if it's NOT used elsewhere OR if it is the current selection
          return !isUsedElsewhere || option.id.toString() === currentSelection;
        });

        return (
          <div
            key={field.id}
            className="flex items-start gap-2 mb-4 p-4 border rounded-lg min-w-0"
          >
            <FormField
              control={control}
              name={`specialOrders.${index}`}
              render={({ field }) => (
                <FormControl>
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Special Order</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selected = SPECIAL_ORDER_LIST.find(
                          (c) => c.id.toString() === value,
                        );
                        field.onChange(selected);
                      }}
                      value={field.value?.id ?? ""}
                    >
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue placeholder="Select special order" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Special Order</SelectLabel>
                          {filteredOptions.map((order) => {
                            return (
                              <SelectItem
                                key={order.id.toString()}
                                value={order.id.toString()}
                                className="truncate"
                              >
                                <span className="truncate">{order.label}</span>
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </FormControl>
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
      })} */}
    </div>
  );
};
