import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import AppHeader from './components/AppHeader';
import Intro from './components/Intro';

import mySvg from './assets/Speedline-20s-1600px.svg';

const theme = createTheme({
	palette: {
		primary: {
			main: '#111111',
		},
		background: {
			default: '#111111',
			paper: '#222222',
		},
		text: {
			primary: '#eeeeee',
		},
	},
	typography: {
		fontFamily: 'Ysabeau Office, sans-serif',
	},
});

function App() {
	return (
		<React.Fragment>
			<CssBaseline>
				<ThemeProvider theme={theme}>
					<Container
						maxWidth={false}
						disableGutters
						sx={{ bgcolor: 'background.default' }}>
						<AppHeader />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<Intro />
							<Intro />
						</Box>
					</Container>
				</ThemeProvider>
			</CssBaseline>
		</React.Fragment>
	);
}

export default App;
