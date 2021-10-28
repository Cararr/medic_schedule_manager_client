import React, { useEffect, useState } from 'react';
import { CgArrowUpR } from 'react-icons/cg';
import styles from './ScrollTopButton.module.scss';
import globalStyles from 'globalStyles.module.scss';

export const ScrollTopButton: React.FunctionComponent = () => {
	const [showButton, setShowButton] = useState(false);

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const toggleVisibility = () => setShowButton(window.pageYOffset > 250);

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<div
			style={{
				display: showButton ? 'initial' : 'none',
			}}
			onClick={scrollTop}
			className={`${styles.container} ${globalStyles.notPrintable}`}
		>
			<CgArrowUpR className={styles.icon} />
		</div>
	);
};
