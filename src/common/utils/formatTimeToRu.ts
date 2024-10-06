export const formatTimeToRu = (time: string | undefined): string => {
    if (!time) return '';
    const date = new Date(time);
    const utcOffset = 3 * 60;
    const localTime = new Date(date.getTime() + utcOffset * 60 * 1000);

    return localTime.toLocaleTimeString('ru-RU');
};
