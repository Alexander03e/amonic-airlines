import { ERRORS } from 'Common/consts/errors';
import { emailSchema } from 'Common/schema';
import { object, string, infer as zInfer } from 'zod';

export const schema = object({
    email: emailSchema,
    password: string({ message: ERRORS.REQUIRED }).min(6, { message: ERRORS.INVALID_PASSWORD }),
});

export type TSignIn = zInfer<typeof schema>;
