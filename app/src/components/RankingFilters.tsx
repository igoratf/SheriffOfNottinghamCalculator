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
import { useNavigate } from "@tanstack/react-router";
import { parse, format } from "date-fns";
import { useState, type FormEvent } from "react";
import { Route } from "@/routes/ranking";

const DEFAULT_DATE_TO_VALUE = format(new Date(), "yyyy-MM-dd");

export const RankingFilters = () => {
  const navigate = useNavigate();
  const {
    players,
    dateTo: initialDateTo,
    dateFrom: initialDateFrom,
  } = Route.useSearch();

  const [dateFrom, setDateFrom] = useState<string | undefined>(initialDateFrom);
  const [dateTo, setDateTo] = useState<string | undefined>(
    initialDateTo || DEFAULT_DATE_TO_VALUE,
  );
  const [isDateFromOpen, setIsDateFromOpen] = useState(false);
  const [isDateToOpen, setIsDateToOpen] = useState(false);
  const [playerSearch, setPlayerSearch] = useState<string | undefined>(players);

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
      setDateFrom(value);
      setIsDateFromOpen(false);
    } else {
      setDateTo(value);
      setIsDateToOpen(false);
    }
  };

  const handleMatchSearch = () => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        dateFrom,
        dateTo,
        players: playerSearch,
      }),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMatchSearch();
  };

  const handleClear = () => {
    setDateFrom(undefined);
    setDateTo(DEFAULT_DATE_TO_VALUE);
    setPlayerSearch(undefined);
    handleMatchSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-4 max-w-lg w-full"
    >
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Search by player name..."
          value={playerSearch}
          onChange={(e) => setPlayerSearch(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="dateFrom">Date from</FieldLabel>
              <Popover open={isDateFromOpen} onOpenChange={setIsDateFromOpen}>
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
              <Popover open={isDateToOpen} onOpenChange={setIsDateToOpen}>
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

      <Button type="submit">Search matches</Button>
      <Button variant="outline" onClick={handleClear}>
        Reset filters
      </Button>
    </form>
  );
};
