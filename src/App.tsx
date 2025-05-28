import {FC, useMemo, useState} from 'react'
import {useInfinityHumans} from "./queries/useInfinityHumans.ts";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver.ts";
import {AddNewRecordModal} from "@/components/AddNewRecordModal/AddNewRecordModal.tsx";
import {Table, Button} from "antd";
import {COLUMNS} from "@/constants/columns.tsx";
import './App.module.scss'

export const App: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data } = useInfinityHumans();
    const triggerRef = useIntersectionObserver();

    const items = useMemo(() => data?.pages.flatMap(page => page.data), [data?.pages]);
    if (!items) return null;
    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>Добавить</Button>
            <div className="card">
                <Table dataSource={items} columns={COLUMNS} pagination={false} sticky={true} rowKey='id'/>
            </div>
            <div className="read-the-docs" ref={triggerRef}>
                Click on the Vite and React logos to learn more
            </div>
            <AddNewRecordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    );
};
