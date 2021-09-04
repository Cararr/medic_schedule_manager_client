import React, { useEffect, useState } from 'react';
import { CgArrowUpR } from 'react-icons/cg';
import './ScrollTopButton.css';

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
			className="scroll-top not-printable"
		>
			<CgArrowUpR className="icon-scroll-top" />
		</div>
	);
};
