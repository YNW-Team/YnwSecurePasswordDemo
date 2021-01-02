import { Divider, Typography } from 'antd';
import styles from '@styles/Home.module.css';
import { getConfigObject } from '@services/services';
import { useSelector } from 'react-redux';

const Result = () => {
	const [config, result] = useSelector(({ generator }) => [generator.config, generator.result]);
	return (
		<>
			<Divider orientation="left">Config object</Divider>
			<pre className={styles.code}>
				<Typography.Paragraph disabled copyable className={styles.code}>
					{config && getConfigObject(config)}
				</Typography.Paragraph>
			</pre>
			<Divider orientation="left">Output</Divider>
			<Typography.Title level={5}>
				If there was an error in the configuration, an error message will be displayed below, otherwise the password will be generated and
				displayed.
			</Typography.Title>
			<pre className={styles.console}>
				<Typography.Paragraph disabled copyable className={styles.console}>
					{result?.result}
				</Typography.Paragraph>
			</pre>
		</>
	);
};

export default Result;
