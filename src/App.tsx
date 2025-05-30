import {FC, useMemo, useState} from 'react'
import {useInfinityHumans} from "./queries/useInfinityHumans.ts";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver.ts";
import {AddNewRecordModal} from "@/components/AddNewRecordModal/AddNewRecordModal.tsx";
import {Table, Card, Spin, Flex} from "antd";
import {COLUMNS} from "@/constants/columns.tsx";
import {CardTitle} from "@/components/CardTitle/CardTitle.tsx";
import styles from './App.module.scss';
import {ScrollToTop} from "@/components/ScrollToTop/ScrollToTop.tsx";

export const App: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, hasNextPage } = useInfinityHumans();
    const triggerRef = useIntersectionObserver();

    const items = useMemo(() => data?.pages.flatMap(page => page.data), [data?.pages]);
    if (!items) return null;
    return (
        <>
            <Card title={<CardTitle openModal={() => setIsModalOpen(true)}/>} className={styles.card}>
                <Table dataSource={items} columns={COLUMNS} sticky pagination={false} rowKey='id'/>
                <Flex justify='center' align='center' ref={triggerRef} style={{height: 100}}>
                    {hasNextPage && <Spin/>}
                </Flex>
                <AddNewRecordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            </Card>
            <ScrollToTop/>
        </>
    );
};