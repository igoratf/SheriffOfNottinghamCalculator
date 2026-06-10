import { SearchIcon, Calendar as CalendarIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

const formatDate = (date?: Date) =>
  date
    ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
    : "DD-MM-YYYY";

export const RankingFilters = () => {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());

  return (
    <div className="mb-4 flex flex-col gap-4 max-w-lg w-full">
      <InputGroup className="w-full">
        <InputGroupInput placeholder="Search player name..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="dateFrom">Date from</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(dateFrom)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    className="rounded-lg border"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel htmlFor="dateTo">Date to</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(dateTo)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    className="rounded-lg border"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <Field orientation={"responsive"}>
        <FieldLabel>Sort by</FieldLabel>
        <Select value="newest">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Newest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="highestScore">Highest score first</SelectItem>
            <SelectItem value="lowestScore">Lowest score first</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
};
