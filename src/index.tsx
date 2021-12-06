import React from 'react';
import ReactDOM from 'react-dom';
import { AppProviders } from 'providers/AppProviders';
import App from 'components/app/App';
import 'global.scss';
import 'WinBox/winBox.css';

ReactDOM.render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>,
	document.getElementById('root')
);
