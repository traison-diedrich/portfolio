import * as React from 'react';

import {
	AppBar,
	Box,
	Button,
	Container,
	Slide,
	Toolbar,
	Typography,
	useScrollTrigger,
} from '@mui/material';

interface HideOnScrollProps {
	children: React.ReactElement;
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
};

export const AppHeader: React.FC = () => {
	return (
		<HideOnScroll>
			<AppBar
				position='sticky'
				elevation={0}
				sx={{ bgcolor: 'background.default' }}>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Typography
							variant='h6'
							sx={{
								my: 1,
								letterSpacing: '.2rem',
								ml: 2,
								color: 'text.primary',
							}}>
							TRAISON DIEDRICH
						</Typography>
						<Box
							sx={{
								marginLeft: 'auto',
								display: 'flex',
								maxWidth: '350px',
								width: '100%',
								justifyContent: 'space-around',
							}}>
							<a href='#intro'>
								<Button sx={{ color: 'text.primary' }}>Home</Button>
							</a>
							<a href='#about'>
								<Button sx={{ color: 'text.primary' }}>About</Button>
							</a>
							<a href='#projects'>
								<Button sx={{ color: 'text.primary' }}>Projects</Button>
							</a>
							<a href='#contact'>
								<Button sx={{ color: 'text.primary' }}>Contact</Button>
							</a>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</HideOnScroll>
	);
};
