import {FC, useMemo, useState} from 'react'
import {useInfinityHumans} from "./queries/useInfinityHumans.ts";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver.ts";
import {AddNewRecordModal} from "@/components/AddNewRecordModal/AddNewRecordModal.tsx";
import {Table, Button, Card, Spin, Flex} from "antd";
import {COLUMNS} from "@/constants/columns.tsx";
import {CardTitle} from "@/components/CardTitle/CardTitle.tsx";
import styles from './App.module.scss';

export const App: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, hasNextPage } = useInfinityHumans();
    const triggerRef = useIntersectionObserver();

    const items = useMemo(() => data?.pages.flatMap(page => page.data), [data?.pages]);
    if (!items) return null;
    return (
        <Card title={<CardTitle openModal={() => setIsModalOpen(true)}/>} classNames={{body: styles.card_body}} className={styles.card}>
            <Table dataSource={items} columns={COLUMNS} pagination={false} sticky={true} rowKey='id'/>
            <Flex justify='center' align='center' ref={triggerRef} style={{height: 100}}>
                {
                    hasNextPage ? <Spin/> : <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>В начало</Button>
                }
            </Flex>
            <AddNewRecordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </Card>
    );
};