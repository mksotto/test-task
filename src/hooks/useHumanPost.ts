import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {Human} from "@/types/api.ts";
import {humansPost} from "@/api/humans/humansPost.ts";
import {PageResponse} from "@/types/PageResponse.ts";
import {App} from "antd";

export const useHumanPost = () => {
    const queryClient = useQueryClient();
    const {message} = App.useApp();
    return useMutation<Human, Error, Human>({
        mutationFn: humansPost,
        onSuccess: (data) => queryClient.setQueryData<InfiniteData<PageResponse<Human>, number>>(
            ['humans'],
            (oldData) => {
                if (!oldData || !oldData.pages[0]) return oldData;
                void message.success('Запись успешно добавлена');
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
        onError: (error) => {
            void message.error('Произошла ошибка');
            console.error('Ошибка создания:', error)
        },
    });
};