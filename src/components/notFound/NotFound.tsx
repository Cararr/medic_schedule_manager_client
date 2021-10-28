import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import globalStyles from 'globalStyles.module.scss';

export const NotFound: React.FunctionComponent = () => {
	return (
		<header className={styles.header}>
			<h1>
				Not Found!
				<br />
				🥺
			</h1>
			<Link to="/">
				<button className={`${globalStyles.button} ${styles.button}`}>↩</button>
			</Link>
		</header>
	);
};
