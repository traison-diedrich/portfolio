import * as React from 'react';
import { Link } from 'react-scroll';

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

const AppHeader: React.FC = () => {
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
						<Box sx={{ marginLeft: 'auto', display: 'flex' }}>
							<Link to='home' smooth={true} duration={1000} offset={-70}>
								<Button sx={{ color: 'text.primary' }}>Home</Button>
							</Link>
							<Button sx={{ color: 'text.primary' }}>Info</Button>
							<Link to='projects' smooth={true} duration={1000}>
								<Button sx={{ color: 'text.primary' }}>Projects</Button>
							</Link>
							<Link to='contact' smooth={true} duration={1000}>
								<Button sx={{ color: 'text.primary' }}>Contact</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</HideOnScroll>
	);
};

export default AppHeader;
