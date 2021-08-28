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
					style={{ fontSize: '1.5rem', marginTop: '.5rem', padding: '0 1rem' }}
					className="button-generic"
				>
					↩
				</button>
			</Link>
		</header>
	);
};
