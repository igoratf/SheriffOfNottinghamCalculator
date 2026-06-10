import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationHandlerProps {
  className: string;
  currentPage: number;
  numberOfPages: number;
}

const MAX_NUMBER_OF_PAGES = 10;

export const PaginationHandler = ({
  className,
  currentPage,
  numberOfPages,
}: PaginationHandlerProps) => {
  const pagesOverflow = numberOfPages > MAX_NUMBER_OF_PAGES;
  const isLastPage = currentPage === numberOfPages;
  const isFirstPage = currentPage === 1;

  return (
    <div className={`sticky bottom-2 bg-background rounded-lg ${className}`}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={isFirstPage ? "opacity-50 pointer-events-none" : ""}
              aria-disabled={isFirstPage}
            />
          </PaginationItem>
          {[...Array(numberOfPages).keys()].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page + 1}
                page={page + 1}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagesOverflow && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pagesOverflow && (
            <PaginationItem>
              <PaginationLink page={numberOfPages}>
                {numberOfPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              aria-disabled={isLastPage}
              page={currentPage + 1}
              className={isLastPage ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
