//Function to format the date for ensuring type compatibility with the backend's local date format.
export const formatLocalDateToYYYYMMDD = (date: string) : string => {
    const oldDate = date.split('.');
    const formattedDate = oldDate[2] + "-" + oldDate[1] + "-" + oldDate[0];
    return formattedDate;
}

  // DATES DIFFERENCE CALCULATING
  // Function to calculate the number of days between two dates
export const calculateDatesDifference = (startDate: Date, endDate: Date): number => {
    // Convert both dates to UTC to ensure consistency
    const utcStartDate = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
        );
    const utcEndDate = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
        );
    // Calculate the difference in milliseconds
    const timeDifference = utcEndDate - utcStartDate;
    // Convert the difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
};