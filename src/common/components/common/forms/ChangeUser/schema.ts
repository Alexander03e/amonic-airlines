import { object, infer as zInfer } from 'zod';
import { emailSchema, stringSchema } from 'Common/schema';

export const schema = object({
    firstName: stringSchema,
    lastName: stringSchema,
    email: emailSchema,
    office: stringSchema,
    role: stringSchema,
});

export type TChangeUser = zInfer<typeof schema>;
