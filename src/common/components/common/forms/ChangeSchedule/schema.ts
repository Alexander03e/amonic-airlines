import { stringSchema } from 'Common/schema';
import { object, infer as zInfer } from 'zod';

export const schema = object({
    date: stringSchema,
    time: stringSchema,
    economy: stringSchema,
});

export type TScheduleForm = zInfer<typeof schema>;
