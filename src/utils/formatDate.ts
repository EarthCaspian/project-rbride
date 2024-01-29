
export const formatLocalDateToYYYYMMDD = (date: string) : string => {
    const oldDate = date.split('.');
    const formattedDate = oldDate[2] + "-" + oldDate[1] + "-" + oldDate[0];
    return formattedDate;
}

