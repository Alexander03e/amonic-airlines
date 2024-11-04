export type TWindowSurvey = '#details' | '#summary' | '#buttons';

export type TSurveyDate = {
    month: string | null;
    year: string | null;
}

export interface ISurveyStore {
    currentWindow: TWindowSurvey;
    currentDate: TSurveyDate

    setCurrentDate: (date: TSurveyDate | null) => void;
    setCurrentWindow: (window: TWindowSurvey) => void;
}