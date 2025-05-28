import {useInfiniteQuery} from "@tanstack/react-query";
import {humansGet} from "../api/humans/humansGet.ts";

export const useInfinityHumans = () => useInfiniteQuery({
    queryKey: ['humans'],
    queryFn: ({pageParam}) => humansGet(pageParam, 25),
    initialPageParam: 1,
    getPreviousPageParam: (firstDataPage) => firstDataPage.prev,
    getNextPageParam: (lastDataPage) => lastDataPage.next,
});