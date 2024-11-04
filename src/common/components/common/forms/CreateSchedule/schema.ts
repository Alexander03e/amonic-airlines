import { stringSchema } from 'Common/schema';
import { boolean, object, infer as zInfer } from 'zod';

export const schema = object({
    date: stringSchema,
    time: stringSchema,
    economy: stringSchema,
    route: stringSchema,
    confirmed: boolean().optional(),
    flightNumber: stringSchema,
    aircraft: stringSchema,
});

export type TCreateScheduleForm = zInfer<typeof schema>;
