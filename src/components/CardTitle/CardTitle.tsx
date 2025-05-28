import {Button, Flex} from "antd";
import {FC} from "react";
import styles from './CardTitle.module.scss';

type Props = {
    openModal: VoidFunction;
};

export const CardTitle: FC<Props> = ({openModal}) => (
    <Flex justify='space-between' className={styles.container}>
        <h2>Записи</h2>
        <Button type='primary' onClick={openModal}>Добавить запись</Button>
    </Flex>
);