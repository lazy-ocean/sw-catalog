export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString("en-GB");
  return formattedDate;
};

export const formatNumberValue = (value: string) => {
  const result = Number(value.replace(/,/g, ""));
  return isNaN(result) ? 0 : result;
};
