import { APIRequestContext, APIResponse } from "@playwright/test";
import 'dotenv/config';


//url de base de l'api
const apiBaseUrl = process.env.API_BASE_URL || 'https://www.automationexercise.com/api';

export class CompteApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //création du compte (post)
    async creerCompte(data: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_date: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobile_number: string;
    }): Promise<APIResponse> {
        return await this.request.post(`${apiBaseUrl}/createAccount`, {
            form: data
        });
    }

    //parser la réponse 
    async parseResponse(reponse: APIResponse): Promise<{
        code: number;
        message: string;
        user: Record<string, unknown>;
    }> {
        const body = await reponse.json();
        return {
            code: body.responseCode,
            message: body.message,
            user: body.user,
        }
    }
    //read

    async getUserByEmail(email: string, password: string): Promise<APIResponse> {
        return await this.request.get(`${apiBaseUrl}/getUserDetailByEmail`, {
            params: {
                email,
                password,
            },
        })
    }

    async modifyData(data: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_date: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobile_number: string;
    }): Promise<APIResponse> {
        return await this.request.put(`${apiBaseUrl}/updateAccount`, {
            form: data,
        });

    }

    //delete acount
    async deleteAcount(email: string, password: string): Promise<APIResponse> {
        return await this.request.delete(`${apiBaseUrl}/deleteAccount`, {
            form: { email, password }
        });
    }

}