import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {Human} from "@/types/api.ts";
import {humansPost} from "@/api/humans/humansPost.ts";
import {PageResponse} from "@/types/PageResponse.ts";

export const useHumanPost = () => {
    const queryClient = useQueryClient();
    return useMutation<Human, Error, Human>({
        mutationFn: humansPost,
        onSuccess: (data) => queryClient.setQueryData<InfiniteData<PageResponse<Human>, number>>(
            ['humans'],
            (oldData) => {
                if (!oldData || !oldData.pages[0]) return oldData;
                return {
                    ...oldData,
                    pages: [
                        {
                            ...oldData.pages[0],
                            data: [data, ...oldData.pages[0].data]
                        },
                        ...oldData.pages.slice(1),
                    ],
                };
            }),
        onError: (error) => console.error('Ошибка создания:', error),
    });
};