//Function to format the date for ensuring type compatibility with the backend's local date format.
export const formatLocalDateToYYYYMMDD = (date: string) : string => {
    const oldDate = date.split('.');
    const formattedDate = oldDate[2] + "-" + oldDate[1] + "-" + oldDate[0];
    return formattedDate;
}


export const formatStringDate = (date: string): string => {
    // Parse the input date string
    const parsedDate = new Date(date);

    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[parsedDate.getDay()];

    // Get the day, month, and year
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear().toString();

    // Return the formatted date string
    return `${dayOfWeek} ${day}-${month}-${year}`;
  };

  export const formatDateToStringDate = (date: Date): string => {
    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayOfWeek = days[date.getDay()];

    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    // Return the formatted date string
    return `${dayOfWeek} ${day}-${month}-${year}`;
};
