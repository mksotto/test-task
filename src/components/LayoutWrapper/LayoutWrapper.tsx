import {FC, ReactNode} from 'react';
import {Layout, Flex} from "antd";
import {VkLogo} from "./components/VkLogo.tsx";
import {GitHubLogo} from "./components/GitHubLogo.tsx";
import styles from "./LayoutWrapper.module.scss";
import cx from "classnames";

type Props = {
    children: ReactNode;
};

export const LayoutWrapper: FC<Props> = ({children}) => (
    <Layout>
        <Layout.Header className={styles.header}>
            <Flex justify='space-between' className={cx(styles.container, styles.header_container)}>
                <Flex align='center' gap={16}>
                    <VkLogo/>
                    <h1>Профильное задание</h1>
                </Flex>
                <a href="https://github.com/mksotto/test-task" target='_blank' className={styles.githubLink}>
                    <GitHubLogo/>
                </a>
            </Flex>
        </Layout.Header>
        <Layout.Content className={styles.content}>
            <div className={styles.container}>
                {children}
            </div>
        </Layout.Content>
    </Layout>
);
