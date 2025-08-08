import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import type { Player } from "./MatchManager/MatchManager";

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
}

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
  const form = useForm<Player>({
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="apple">Apple</FormLabel>
                <FormControl>
                  <Input
                    id="apple"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="bread">Bread</FormLabel>
                <FormControl>
                  <Input
                    id="bread"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="bread">Cheese</FormLabel>
                <FormControl>
                  <Input
                    id="bread"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="bread">Chicken</FormLabel>
                <FormControl>
                  <Input
                    id="bread"
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
            render={() => (
              <FormItem>
                <FormLabel htmlFor="bread">Contraband</FormLabel>
                <FormControl>
                  <Input
                    id="bread"
                    placeholder="0"
                    type="number"
                    min={0}
                    max={99}
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
