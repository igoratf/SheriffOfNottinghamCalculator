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

import type { Player } from "@/utils/types.d";
import { ContrabandsSelect } from "./ContrabandsSelect";
import { playerFormSchema } from "@/utils/schemas";

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
}

/* const transformFormDataToPlayer = (formData: FormData): Player => {
  const contrabands: PlayerContraband[] = formData.contrabands?.map(
    (item: Contraband) => {
      const contraband = CONTRABAND_OPTIONS.find(
        (c) => c.name === item.contrabandName,
      );
      if (!contraband) {
        throw new Error(`Contraband not found: ${item.contrabandName}`);
      }
      return {
        contraband,
        quantity: item.quantity,
      };
    },
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
}; */

const handleInputChange =
  (field: { onChange: (value: string) => void }) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+(?!$)/, "");
    field.onChange(value);
  };

export type FormData = z.input<typeof playerFormSchema>;

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      apple: 0,
      bread: 0,
      cheese: 0,
      chicken: 0,
      contrabands: [],
      coin: 0,
    },
  });

  const { control, handleSubmit } = form;

  const handleFormSubmit = (data: FormData) => {
    console.log("DATA SUBMITTED ", data);
    /* const playerData = transformFormDataToPlayer(data); */
    /* onSubmit(playerData); */
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

        <ContrabandsSelect
          control={control}
          name={"contrabands"}
          handleInputChange={handleInputChange}
        />
      </form>
    </Form>
  );
};
