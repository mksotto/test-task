import {useEffect, useState} from "react";
import {ArrowUpOutlined} from "@ant-design/icons";
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!visible) return null;

    return (
        <div onClick={() => scrollTo({top: 0, behavior: 'smooth'})} className={styles.button}>
            <ArrowUpOutlined/>
        </div>
    );
};