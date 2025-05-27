import {humansRequestService} from "./base.ts";
import {Human} from "@/types/api.ts";

export const humansPost = (data: Human) => humansRequestService<Human>({
    url: '',
    method: 'POST',
    data,
});