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
import { Calendar } from "./ui/calendar";
import { Link } from "@tanstack/react-router";
import { parse, format } from "date-fns";
import { useState } from "react";

export const RankingFilters = () => {
  const [dateFrom, setDatefrom] = useState<string | undefined>();
  const [dateTo, setDateTo] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd"),
  );

  const selectedFrom = dateFrom
    ? parse(dateFrom, "yyyy-MM-dd", new Date())
    : undefined;
  const selectedTo = dateTo
    ? parse(dateTo, "yyyy-MM-dd", new Date())
    : undefined;

  const handleDateChange = (
    calendarType: "from" | "to",
    date: Date | undefined,
  ) => {
    const value = date ? format(date, "yyyy-MM-dd") : undefined;
    if (calendarType === "from") {
      setDatefrom(value);
    } else {
      setDateTo(value);
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-4 max-w-lg w-full">
      <InputGroup className="w-full">
        <InputGroupInput placeholder="Search by player name..." />
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
                    {dateFrom || "YYYY-MM-DD"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedFrom}
                    onSelect={(date) => handleDateChange("from", date)}
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
                    {dateTo || "YYYY-MM-DD"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedTo}
                    onSelect={(date) => handleDateChange("to", date)}
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

      <Button>
        <Link
          to="."
          search={(prev) => ({
            ...prev,
            dateFrom,
            dateTo,
          })}
        >
          Search matches
        </Link>
      </Button>
    </div>
  );
};
