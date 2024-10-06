export const getTimeFromISOString = (isoString: string | undefined): string => {
    if (!isoString) return '';

    const timeMatch = isoString.match(/T(\d{2}:\d{2}:\d{2})/);
    if (timeMatch && timeMatch[1]) {
        return timeMatch[1];
    }
    return '';
};
