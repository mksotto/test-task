import {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import './App.css'
import {useInfinityHumans} from "./queries/useInfinityHumans.ts";
import {AddNewRecordModal} from "@/components/AddNewRecordModal/AddNewRecordModal.tsx";
import {Table} from "antd";
import {COLUMNS} from "@/components/columns.ts";

export const App: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinityHumans();
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
    const items = useMemo(() => data?.pages.flatMap(page => page.data), [data?.pages]);

    if (!items) return null;

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setIsModalOpen(true)}>
                    prev
                </button>
                <button onClick={() => fetchNextPage()}>
                    next
                </button>
                <Table dataSource={items} columns={COLUMNS} pagination={false} sticky={true}/>
            </div>
            <p className="read-the-docs" ref={triggerRef}>
                Click on the Vite and React logos to learn more
            </p>
            <AddNewRecordModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
        </>
    );
};
