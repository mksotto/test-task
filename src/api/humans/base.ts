import {makeRequestService} from "@/utils/makeRequestService.ts";
import {HUMANS_API_BASE_URL} from "@/constants/constants.ts";

export const humansRequestService = makeRequestService(HUMANS_API_BASE_URL);