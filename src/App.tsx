import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { About } from './components/About';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { Contact } from './components/Contact';
import { Intro } from './components/Intro';
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

// TODO: need to make the website mobile compatible by removing
// some excess padding and margins for the media query

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
							<About />
							<Projects />
							<Contact />
							<AppFooter />
						</Box>
					</Container>
				</ThemeProvider>
			</CssBaseline>
		</React.Fragment>
	);
}

export default App;
