import {FC} from "react";
import {Input, Modal, Form, Button} from "antd";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const AddNewRecordModal: FC<Props> = ({isOpen, setIsOpen}) => {


    return (
        <Modal open={isOpen} onOk={() => setIsOpen(false)}>
            <Form>
                <Form.Item>
                    <Input type="text"/>
                </Form.Item>
                <Button type='default'>закончить</Button>
            </Form>
        </Modal>
    );
};