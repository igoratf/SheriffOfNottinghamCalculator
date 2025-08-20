import { useForm } from "react-hook-form";
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
import type { Player } from "@/utils/types";

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
  contraband: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
  coin: z.coerce
    .number()
    .min(0, "Must be at least 0")
    .max(99, "Must be at most 99"),
});

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
}

const handleInputChange =
  (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      contraband: "",
      coin: "",
    },
  });

  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form id="player-form" onSubmit={handleSubmit(onSubmit)}>
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
            name="contraband"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contraband">Contraband</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id="contraband"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription className="whitespace-nowrap">
                  Amount of contraband
                </FormDescription>
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
      </form>
    </Form>
  );
};
