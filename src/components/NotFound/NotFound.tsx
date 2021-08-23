import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound: React.FunctionComponent = () => {
	return (
		<header className="not-found">
			<h1>
				Not Found!
				<br />
				🥺
			</h1>
			<Link to="/">
				<button
					style={{ marginTop: '.5rem', padding: '0 1rem' }}
					className="button-green"
				>
					↩
				</button>
			</Link>
		</header>
	);
};
