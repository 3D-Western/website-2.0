// parse date from Month DD, YYYY
export const parseDate = (dateStr: string) => {
  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
  return new Date(cleaned).toISOString();
};
