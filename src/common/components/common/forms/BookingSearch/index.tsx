import { Button, LabeledDropdown, LabeledInput } from 'Common/components/ui';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { schema, TBookingForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCabinTypes } from 'Common/api/common/hooks';
import { LABELS } from './consts';
import { useAirports } from 'Common/api/airports/hooks';
import { RadioGroup } from 'Common/components/ui/RadioGroup';
import { useEffect, useState } from 'react';
import { getClassByValue } from 'Common/utils/getClassByValue';
import styles from './booking-search-form.module.scss';
import { EBookingSearchType } from './enums';
import { useBookingStore } from 'Common/store/booking';
import { TCabinType } from 'Common/types/flights';
import { ShedulesApi } from 'Common/api/shedules/api';
import { formatDateToYYYYDDMM } from '../../../../utils/formatDateToYYYYDDMM';

const shedulesApi = ShedulesApi.getInstance();

export const BookingSearchForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        reset,
    } = useForm<TBookingForm>({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            type: EBookingSearchType.RETURN,
        },
    });

    const {
        setOutboundFlights,
        setReturnFlights,
        setBookingType,
        setCabinType,
        setSelectedOutbound,
        setSelectedReturn,
    } = useBookingStore();

    const onReset = () => {
        reset();
        setOutboundFlights(null);
        setReturnFlights(null);
    };

    const { data: cabinData } = useCabinTypes();
    const { data: airportsData } = useAirports();

    const { from, to, type } = useWatch({ control });

    const airportsOptions = airportsData?.map(item => ({
        value: String(item.iatacode),
        label: item.name,
    }));

    const cabinOptions = cabinData?.map(item => ({
        value: String(item.name),
        label: getClassByValue(item.name),
    }));

    const flightTypeOptions = [
        { value: EBookingSearchType.RETURN, name: LABELS.RETURN },
        { value: EBookingSearchType.ONE_WAY, name: LABELS.ONE_WAY },
    ];

    useEffect(() => {
        if (cabinData && setValue) {
            setValue('cabinType', cabinOptions?.[0]?.value ?? '');
            const findedCabin = cabinData?.find(
                item => item.name === (cabinOptions?.[0].value as TCabinType),
            );

            setCabinType(findedCabin ?? null);
        }
    }, [cabinData, setValue]);

    const onSubmit = async (data: TBookingForm) => {
        setBookingType(data.type ?? null);
        const findedCabin = cabinData?.find(item => item.name === (data.cabinType as TCabinType));
        setCabinType(findedCabin ?? null);

        setIsLoading(true);
        try {
            const outboundFlightsApi = await shedulesApi.getSchedulesByFilters({
                arrivalAirport: data.to,
                date: formatDateToYYYYDDMM(data.outboundDate),
                departureAirport: data.from,
            });
            setOutboundFlights(outboundFlightsApi);
        } catch (e) {
            console.log(e);
            setOutboundFlights(null);
        }

        try {
            const returnFlightsApi = await shedulesApi.getSchedulesByFilters({
                arrivalAirport: data.from,
                date: formatDateToYYYYDDMM(data.returnDate),
                departureAirport: data.to,
            });
            setReturnFlights(returnFlightsApi);
        } catch (e) {
            console.log(e);
            setReturnFlights(null);
        }

        setIsLoading(false);
        setSelectedOutbound(null);
        setSelectedReturn(null);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>{LABELS.FORM}</legend>
                {/* <DevTool control={control} /> */}
                <div className={styles.inputs}>
                    <div className={styles.row}>
                        <Controller
                            control={control}
                            name='cabinType'
                            render={({ field: { onChange, value } }) => (
                                <LabeledDropdown
                                    error={errors.cabinType?.message}
                                    label={LABELS.CABIN}
                                    value={value}
                                    onChange={onChange}
                                    options={cabinOptions ?? []}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name='from'
                            render={({ field: { onChange, value } }) => (
                                <LabeledDropdown
                                    error={errors.from?.message}
                                    label={LABELS.FROM}
                                    value={value}
                                    onChange={onChange}
                                    options={
                                        airportsOptions?.filter(item => item.value !== to) ?? []
                                    }
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name='to'
                            render={({ field: { onChange, value } }) => (
                                <LabeledDropdown
                                    error={errors.to?.message}
                                    label={LABELS.TO}
                                    value={value}
                                    onChange={onChange}
                                    options={
                                        airportsOptions?.filter(item => item.value !== from) ?? []
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className={styles.row}>
                        <Controller
                            control={control}
                            name='type'
                            render={({ field: { onChange, value } }) => (
                                <RadioGroup
                                    label={LABELS.TICKET_TYPE}
                                    error={errors.type?.message}
                                    items={flightTypeOptions}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <LabeledInput
                            type='date'
                            placeholder='дд.мм.гггг'
                            {...register('outboundDate')}
                            error={errors.outboundDate?.message}
                            label={LABELS.OUTBOUND_DATE}
                        />
                        <LabeledInput
                            type='date'
                            placeholder='дд.мм.гггг'
                            disabled={type === EBookingSearchType.ONE_WAY}
                            {...register('returnDate')}
                            error={errors.returnDate?.message}
                            label={LABELS.RETURN_DATE}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button
                        isLoading={isLoading}
                        type='submit'
                        variant='primary'
                        label={LABELS.SEARCH}
                    />
                    <Button onClick={onReset} type='button' variant='danger' label={LABELS.RESET} />
                </div>
            </fieldset>
        </form>
    );
};
