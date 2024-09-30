import { stringSchema } from 'Common/schema';
import { object, infer as zInfer } from 'zod';

export const schema = object({
    email: stringSchema,
    password: stringSchema,
});

export type TSignIn = zInfer<typeof schema>;
