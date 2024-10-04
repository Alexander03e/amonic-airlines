import { ERRORS } from 'Common/consts/errors';
import { dateSchema, emailSchema, phoneSchema, stringSchema } from 'Common/schema';
import { object, string, infer as zInfer } from 'zod';

export const schema = object({
    firstName: stringSchema,
    lastName: stringSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: string({ message: ERRORS.REQUIRED }).min(6, { message: ERRORS.INVALID_PASSWORD }),
    office: stringSchema,
    birthdate: dateSchema,
});

export type TSignUp = zInfer<typeof schema>;