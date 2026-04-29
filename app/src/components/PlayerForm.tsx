import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { ContrabandsSelect } from "./ContrabandsSelect";
import { playerFormSchema, type PlayerFormData } from "@/utils/schemas";

interface PlayerFormProps {
  onSubmit: (data: PlayerFormData) => void;
}

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: string) => void },
) => {
  const value = e.target.value.replace(/^0+(?!$)/, "");
  field.onChange(value);
};

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const form = useForm<PlayerFormData>({
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

  const handleFormSubmit = (data: PlayerFormData) => {
    console.log("DATA SUBMITTED ", data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        id="player-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-h-[80vh] overflow-auto"
      >
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
                    onChange={(e) => handleInputChange(e, field)}
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
                    onChange={(e) => handleInputChange(e, field)}
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
                    onChange={(e) => handleInputChange(e, field)}
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
                    onChange={(e) => handleInputChange(e, field)}
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
                    onChange={(e) => handleInputChange(e, field)}
                  ></Input>
                </FormControl>
                <FormDescription>Amount of coin</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <hr className="my-4" />

        <ContrabandsSelect control={control} />
      </form>
    </Form>
  );
};
