// Validate page
export const isPageValid = (
  page: string | null,
  total: number,
  totalPerPage: number,
): boolean => {
  // Check if page exists
  if (!page) return false;

  // Check if page is a number
  if (isNaN(parseInt(page))) return false;

  // Check if page is greater than 0
  if (parseInt(page) <= 0) return false;

  // Check if page is less than or equal to the last page
  if (parseInt(page) > Math.ceil(total / totalPerPage)) return false;

  return true;
};
