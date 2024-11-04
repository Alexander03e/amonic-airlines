import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { KEYS } from "Common/types/api"
import { SurveyApi } from "./api"
import { IGetReport, TSurveyRegPayload } from "Common/types/survey"

const surveysApi = SurveyApi.getInstance()

export const useSurveys = () => {
    return useQuery({
        queryKey: [KEYS.SURVEYS],
        queryFn: () => surveysApi.getSurveys()
    })
}

export const useAddSurveys = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: TSurveyRegPayload[]) => surveysApi.addSurveys(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [KEYS.SURVEYS]
            })
        }
    })
}

export const useDetailReport = () => {
    return useMutation({
        mutationKey: [KEYS.FULL_REPORTS],
        mutationFn: (data: IGetReport) => surveysApi.getFullReports(data)
    })
}

export const useSummaryReport = () => {
    return useMutation({
        mutationKey: [KEYS.REPORTS],
        mutationFn: (data: IGetReport) => surveysApi.getReports(data)
    })
}