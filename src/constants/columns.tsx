import {Human} from "@/types/api.ts";
import {TableProps, Typography} from "antd";

export const COLUMNS: TableProps<Human>['columns'] = [
    {
        dataIndex: 'firstName',
        title: 'Имя',
        align: 'center',
    },
    {
        dataIndex: 'lastName',
        title: 'Фамилия',
        align: 'center',
    },
    {
        dataIndex: 'age',
        title: 'Возраст',
        align: 'center',
    },
    {
        title: 'Место проживания',
        children: [
            {
                dataIndex: 'city',
                title: 'Город',
                align: 'center',
            },
            {
                dataIndex: 'country',
                title: 'Страна',
                align: 'center',
            },
        ]
    },
    {
        dataIndex: 'email',
        title: 'Электронная почта',
        render: (value: Human['email']) => (
            <Typography.Link href={`mailto:${value}`}>{value}</Typography.Link>
        ),
    },
];