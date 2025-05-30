import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";
import {render, renderHook, RenderHookOptions, RenderOptions} from "@testing-library/react";

export const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={ruRU}>
                {children}
            </ConfigProvider>
        </QueryClientProvider>
    );
};

export const renderComponentWithWrapper = (
    component: ReactNode,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(component, {
    wrapper: createWrapper(),
    ...options,
});

export const renderHookWithWrapper = <TProps, TResult>(
    hook: (props?: TProps) => TResult,
    options?: Omit<RenderHookOptions<TProps>, 'wrapper'>
) => renderHook<TResult, TProps>(hook, {
    wrapper: createWrapper(),
    ...options,
});