import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import AppHeader from './components/AppHeader';
import { Contact } from './components/Contact';
import Intro from './components/Intro';
import { Projects } from './components/Projects';

const theme = createTheme({
	palette: {
		primary: {
			main: '#111111',
		},
		secondary: {
			main: '#eeeeee',
		},
		background: {
			default: '#111111',
			paper: '#eeeeee',
		},
		text: {
			primary: 'rgba(238, 238, 238, 0.87)',
			secondary: 'rgba(238, 238, 238, 0.6)',
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
							<Projects />
							<Contact />
						</Box>
					</Container>
				</ThemeProvider>
			</CssBaseline>
		</React.Fragment>
	);
}

export default App;
