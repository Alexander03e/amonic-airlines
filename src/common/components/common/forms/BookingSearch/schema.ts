import { ERRORS } from 'Common/consts/errors';
import { stringSchema } from 'Common/schema';
import { nativeEnum, object, string, infer as zInfer } from 'zod';
import { EBookingSearchType } from './enums';

export const schema = object({
    from: stringSchema,
    to: stringSchema,
    cabinType: string({ message: ERRORS.REQUIRED }),
    type: nativeEnum(EBookingSearchType).optional(),
    outboundDate: stringSchema,
    returnDate: string().optional(),
});

export type TBookingForm = zInfer<typeof schema>;
