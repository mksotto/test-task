import {useCallback, useEffect, useRef} from "react";
import {useInfinityHumans} from "@/queries/useInfinityHumans.ts";

export const useIntersectionObserver = () => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinityHumans();
    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        const [triggerElement] = entries;
        if (triggerElement.isIntersecting && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
    useEffect(() => {
        const element = triggerRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(observerCallback, {rootMargin: '0px 0px 400px 0px'});
        observer.observe(element);
        return () => observer.disconnect();
    }, [observerCallback]);

    return triggerRef;
};