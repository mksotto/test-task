import {Human} from "@/types/api.ts";
import {TableProps} from "antd";

export const COLUMNS: TableProps<Human>['columns'] = [
    {
        dataIndex: 'firstName',
        title: 'Имя'
    },
    {
        dataIndex: 'lastName',
        title: 'Фамилия'
    },
    {
        dataIndex: 'age',
        title: 'Возраст'
    },
    {
        dataIndex: 'city',
        title: 'Город'
    },
    {
        dataIndex: 'country',
        title: 'Страна'
    },
    {
        dataIndex: 'email',
        title: 'Электронная почта'
    },
];