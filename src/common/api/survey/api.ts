import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';
import { IGetReport, ISurvey, IShortReport, TSurveyRegPayload, TFullReport } from 'Common/types/survey';


export class SurveyApi {
    private static _instance: SurveyApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new SurveyApi();

        return this._instance;
    }

    async getSurveys(): Promise<ISurvey[]> {
        return (await this._httpInstance.get('/surveys')).data;
    }

    async getSurveyByID(id: number): Promise<ISurvey> {
        return (await this._httpInstance.get(`/surveys/${id}`)).data;
    }

    async getReports(data: IGetReport): Promise<IShortReport> {
        return (await this._httpInstance.post('/surveys/reports', data)).data;
    }

    async getFullReports(data: IGetReport): Promise<TFullReport> {
        return (await this._httpInstance.post('/surveys/fullreports', data)).data;
    }

    async addSurveys(data: Array<TSurveyRegPayload>): Promise<Array<ISurvey>> {
        return (await this._httpInstance.post('/surveys', data)).data;
    }
}