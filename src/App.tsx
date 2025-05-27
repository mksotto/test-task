import {type FC, useCallback, useEffect, useRef} from 'react'
import './App.css'
import {useInfinityHumans} from "./queries/useInfinityHumans.ts";
import React from 'react';

export const App: FC = () => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { data, fetchNextPage, fetchPreviousPage, hasNextPage, isFetchingNextPage } = useInfinityHumans();
    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        const [triggerElement] = entries;
        if (triggerElement.isIntersecting && hasNextPage && !isFetchingNextPage) void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
    useEffect(() => {
        const element = triggerRef.current
        if (!element) return;
        const observer = new IntersectionObserver(observerCallback, {rootMargin: '0px 0px 200px 0px'});
        observer.observe(element);
        return () => observer.disconnect();
    }, [observerCallback]);
    if (!data) return null;
    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
            <button onClick={() => fetchPreviousPage()}>
                prev
            </button>
            <button onClick={() => fetchNextPage()}>
                next
            </button>
            <p>
                {data.pages?.map(page => (
                    <React.Fragment key={page.next}>
                        {page?.data?.map(foo => (
                            <p key={foo.id}>{foo.age}</p>
                        ))}
                    </React.Fragment>
                ))}
            </p>
            </div>
            <p className="read-the-docs" ref={triggerRef}>
            Click on the Vite and React logos to learn more
            </p>
        </>
    );
};
