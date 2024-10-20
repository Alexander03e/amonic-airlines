import { stringSchema } from 'Common/schema';
import { object, infer as zInfer } from 'zod';

export const schema = object({
    firstName: stringSchema,
    lastName: stringSchema,
    birthdate: stringSchema,
    passport: stringSchema,
    passportCountry: stringSchema,
    phone: stringSchema,
});

export type TPassengersForm = zInfer<typeof schema>;
