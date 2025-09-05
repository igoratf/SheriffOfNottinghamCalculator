import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Player, PlayerContraband } from "@/utils/types.d";
import { CONTRABAND_OPTIONS } from "@/utils/constants";

const contrabandSchema = z.object({
  contrabandName: z.string().min(1, "Contraband type is required"),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity must be at most 99"),
});

export const playerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(12, "Name must be at most 12 characters"),
  apple: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  bread: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  cheese: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  chicken: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  contrabands: z.array(contrabandSchema).default([]),
  coin: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
});

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
}

const transformFormDataToPlayer = (formData: any): Player => {
  const contrabands: PlayerContraband[] = formData.contrabands.map(
    (item: any) => {
      const contraband = CONTRABAND_OPTIONS.find(
        (c) => c.name === item.contrabandName
      );
      if (!contraband) {
        throw new Error(`Contraband not found: ${item.contrabandName}`);
      }
      return {
        contraband,
        quantity: item.quantity,
      };
    }
  );

  return {
    name: formData.name,
    apple: formData.apple,
    bread: formData.bread,
    cheese: formData.cheese,
    chicken: formData.chicken,
    contrabands,
    coin: formData.coin,
  };
};

const handleInputChange =
  (field: { onChange: (value: string) => void }) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+(?!$)/, "");
    field.onChange(value);
  };

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const form = useForm({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      apple: "",
      bread: "",
      cheese: "",
      chicken: "",
      contrabands: [],
      coin: "",
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contrabands",
  });

  const handleFormSubmit = (data: any) => {
    const playerData = transformFormDataToPlayer(data);
    onSubmit(playerData);
  };

  return (
    <Form {...form}>
      <form id="player-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="name"
                  placeholder="Insert player name"
                  type="text"
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="my-4" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <FormField
            name="apple"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="apple">Apple</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="apple"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of apple</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bread"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bread">Bread</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="bread"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of bread</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="cheese"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cheese">Cheese</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="cheese"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of cheese</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="chicken"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="chicken">Chicken</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="chicken"
                    placeholder="0"
                    type="number"
                    onChange={handleInputChange(field)}
                    min={-1}
                    max={99}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of chicken</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="coin"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="coin">Coin</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="coin"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of coin</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <hr className="my-4" />

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
            const usedContrabands = (form.watch("contrabands") || [])
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full min-w-0">
                            <SelectValue placeholder="Select contraband" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CONTRABAND_OPTIONS.filter(
                            (contraband) =>
                              !usedContrabands.includes(contraband.name)
                          ).map((contraband) => (
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
      </form>
    </Form>
  );
};
