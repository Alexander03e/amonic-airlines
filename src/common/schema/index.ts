import { ERRORS } from 'Common/consts/errors';
import { string } from 'zod';

const validatePhone = (value: string) => {
    if (!value) return;
    const unmask = value.replace(/[^\d]/g, '');
    return unmask.length === 11;
};

const validateDate = (value: string) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

/** Дефолтная схема для полей */
export const stringSchema = string({ message: ERRORS.REQUIRED }).min(1, {
    message: ERRORS.REQUIRED,
});

/** Схема обработки телефона */
export const phoneSchema = stringSchema.refine(validatePhone, { message: ERRORS.INVALID_PHONE });

/** Схема обработки email */
export const emailSchema = stringSchema.email({ message: ERRORS.INVALID_EMAIL });

/** Схема обработки даты */
export const dateSchema = stringSchema
    .regex(dateRegex, { message: ERRORS.INVALID_DATE })
    .refine(validateDate, { message: ERRORS.INVALID_DATE });
