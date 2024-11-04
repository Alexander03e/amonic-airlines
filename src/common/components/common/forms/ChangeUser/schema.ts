import { number, object, string, infer as zInfer } from 'zod';
import { emailSchema, stringSchema } from 'Common/schema';
import { ERRORS } from 'Common/consts/errors';

export const schema = object({
    firstName: stringSchema,
    lastName: stringSchema,
    email: emailSchema,
    office: string({ message: ERRORS.REQUIRED }),
    role: number({ message: ERRORS.REQUIRED }),
});

export type TChangeUser = zInfer<typeof schema>;
