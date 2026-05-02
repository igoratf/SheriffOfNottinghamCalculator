/**
 * Calculate the number of records to skip on a paginated query
 * @param page - current page number
 * @returns skip value
 */

export const ITEMS_PER_PAGE = 10;
export const getPageOffset = (page: number) => {
  return (page - 1) * ITEMS_PER_PAGE;
};
