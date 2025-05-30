import {FC} from "react";
import {Input, Modal, Form, FormProps, InputNumber} from "antd";
import {useHumanPost} from "@/hooks/useHumanPost.ts";
import {Human} from "@/types/api.ts";
import {v7 as uuid} from "uuid";

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
};

type HumanFormType = Omit<Human, 'id'>;

export const AddNewRecordModal: FC<Props> = ({isOpen, onClose}) => {
    const [form] = Form.useForm();
    const {mutate} = useHumanPost();
    const onFinish: FormProps<HumanFormType>['onFinish'] = (v) => {
        const id = uuid();
        mutate({id, ...v });
        onClose();
    };
    return (
        <Modal
            title='Добавить запись'
            open={isOpen}
            onOk={form.submit}
            onCancel={onClose}
            destroyOnHidden
            okText='ОК'
            cancelText='Отмена'
        >
            <Form
                form={form}
                requiredMark={false}
                labelAlign='left'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item<HumanFormType>
                    name='firstName'
                    label='Имя'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите имя'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<HumanFormType>
                    name='lastName'
                    label='Фамилия'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите фамилию'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<HumanFormType>
                    name='age'
                    label='Возраст'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите возраст'}
                    ]}
                >
                    <InputNumber controls={false} min={0} max={100} style={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item<HumanFormType>
                    name='city'
                    label='Город'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите город'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<HumanFormType>
                    name='country'
                    label='Страна'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите страну'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<HumanFormType>
                    name='email'
                    label='Эл. почта'
                    validateDebounce={1000}
                    rules={[
                        {required: true, message: 'Пожалуйста, введите электронную почту'},
                        {type: 'email', message: 'Невалидный адрес электронной почты'}
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};