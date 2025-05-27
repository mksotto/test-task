import {humansRequestService} from "./base.ts";
import {Human} from "@/types/api.ts";
import {PageResponse} from "@/types/PageResponse.ts";

export const humansGet = (page: number, perPage: number = 10) => humansRequestService<PageResponse<Human>>({
    url: '',
    method: 'GET',
    params: {
        '_page': page,
        '_per_page': perPage,
    }
});