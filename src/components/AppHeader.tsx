import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Slide,
	Toolbar,
	Typography,
	useScrollTrigger,
} from '@mui/material';
import { useBreakpoint } from '../BreakpointProvider';

interface HideOnScrollProps {
	trigger: boolean;
	children: React.ReactElement;
}

const HideOnScroll = ({ trigger, children }: HideOnScrollProps) => {
	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
};

export const AppHeader: React.FC = () => {
	const trigger = useScrollTrigger();

	const breakpoint = useBreakpoint();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	React.useEffect(() => {
		if (trigger && anchorEl) {
			onClose();
		}
	}, [trigger, anchorEl]);

	const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const onClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (sectionId: string) => () => {
		onClose();

		setTimeout(() => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);
	};

	return (
		<HideOnScroll trigger={trigger}>
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
						{breakpoint === 'mobile' ? (
							<>
								<IconButton onClick={toggleMenu} sx={{ marginLeft: 'auto' }}>
									<MenuIcon sx={{ color: 'text.primary' }} />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									open={open}
									onClose={onClose}
									disableScrollLock
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									sx={{
										'& .MuiPaper-root': {
											color: 'primary.main',
										},
									}}>
									<MenuItem onClick={handleMenuItemClick('intro')}>
										Home
									</MenuItem>
									<MenuItem onClick={handleMenuItemClick('about')}>
										About
									</MenuItem>
									<MenuItem onClick={handleMenuItemClick('projects')}>
										Projects
									</MenuItem>
									<MenuItem onClick={handleMenuItemClick('contact')}>
										Contact
									</MenuItem>
								</Menu>
							</>
						) : (
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
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</HideOnScroll>
	);
};
