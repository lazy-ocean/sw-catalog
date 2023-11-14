export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString("en-GB");
  return formattedDate;
};
