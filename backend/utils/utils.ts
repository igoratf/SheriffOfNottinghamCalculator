import { MatchSort } from "../constants.js";

export const parseMatchSort = (value: unknown): MatchSort | undefined =>
  value === MatchSort.ASC || value === MatchSort.DESC ? value : undefined;

/**
 * Parse DD-MM-YYYY format string to Date object
 * @param dateString in DD-MM-YYYY format
 * @returns Date object or null if invalid
 */
export const parseStringToDate = (
  dateString: string,
  endOfDay?: boolean,
): Date | null => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  // Set date to end of day so all matches from the day are included
  if (endOfDay) {
    date.setHours(23, 59, 59, 999);
  }
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Calculate the number of records to skip on a paginated query
 * @param page - current page number
 * @returns skip value
 */

export const ITEMS_PER_PAGE = 10;
export const getPageOffset = (page: number) => {
  return (page - 1) * ITEMS_PER_PAGE;
};
