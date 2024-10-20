import { TCabinType } from 'Common/types/flights';

export const getClassByValue = (value: TCabinType | string | undefined | null): string => {
    if (!value) return '';

    switch (value) {
        case 'Economy':
            return 'Эконом';
        case 'Business':
            return 'Бизнес-класс';
        case 'First Class':
            return 'Первый класс';
        default:
            return value;
    }
};
