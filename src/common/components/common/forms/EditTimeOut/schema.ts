import { stringSchema } from 'Common/schema';
import { object, infer as zInfer } from 'zod';

export const schema = object({
    reason: stringSchema.optional(),
    time: stringSchema,
});

export type TEditTime = zInfer<typeof schema>;
