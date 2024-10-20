export const formatDateToYYYYDDMM = (date?: string | null) => {
    if (!date) return '';

    const [year, m, d] = date.split('-');

    return `${year}-${d}-${m}`;
};
