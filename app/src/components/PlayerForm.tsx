import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import type { Player } from "@/utils/types";

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
}

const handleInputChange =
  (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+(?!$)/, "");
    field.onChange(value);
  };

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const form = useForm<Player>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      apple: 0,
      bread: 0,
      cheese: 0,
      chicken: 0,
      contraband: 0,
      coin: 0,
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
              {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="apple"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of apple</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="bread"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of bread</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="cheese"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of cheese</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="chicken"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of chicken</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="contraband"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of contraband</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
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
                    id="coin"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleInputChange(field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of coin</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
              </FormItem>
            )}
          />
          <FormField
            name="coin"
            control={control}
            render={() => (
              <FormItem>
                <FormLabel htmlFor="bread">Coin</FormLabel>
                <FormControl>
                  <Input
                    id="coin"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of coin</FormDescription>
                {/* <FormMessage>Error will come here</FormMessage> */}
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

import { z } from "zod";

export const playerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(12, "Name must be at most 12 characters"),
  apple: z.number().min(0, "Must be at least 0").max(99, "Must be at most 99"),
  bread: z.number().min(0).max(99),
  cheese: z.number().min(0).max(99),
  chicken: z.number().min(0).max(99),
  contraband: z.number().min(0).max(99),
  coin: z.number().min(0).max(99),
});
