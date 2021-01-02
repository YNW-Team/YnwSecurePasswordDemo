import Head from 'next/head';
import styles from '@styles/Home.module.css';
import 'antd/dist/antd.css';
import { Col, Divider, Row } from 'antd';
import ConfigurationForm from '@components/ConfigurationForm';
import Result from '@components/Result';

const Home = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>YnwSecurePassword Demo</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://www.npmjs.com/package/ynw-secure-password">YnwSecurePassword</a> demo!
				</h1>
				<p className={styles.description}>A JavaScript secure password library for generating and validate a secure password.</p>
				<Row gutter={[16, 16]}>
					<Col lg={12} sm={24}>
						<Divider orientation="left">Configuration</Divider>
						<ConfigurationForm />
					</Col>
					<Col lg={12} sm={24}>
						<Result />
					</Col>
				</Row>
			</main>

			<footer className={styles.footer}>
				Powered by
				<a href="https://github.com/YNW-Team" target="_blank" rel="noopener noreferrer">
					<img src="https://avatars3.githubusercontent.com/u/75215721?s=64&v=4" alt="YNW Logo" className={styles.logo} /> Ynw Team | Youssef
					Hamlili
				</a>
			</footer>
		</div>
	);
};

export default Home;
