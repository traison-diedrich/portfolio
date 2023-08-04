import {
	FavoriteOutlined,
	GitHub,
	Instagram,
	LinkedIn,
} from '@mui/icons-material';
import { Box, BoxProps, Typography } from '@mui/material';
import * as React from 'react';

const IconBox: React.FC<BoxProps> = ({ ...props }) => {
	const iconSize = 'clamp(3rem, 6vw, 4rem)';

	return (
		<Box {...props}>
			<a
				href='https://www.instagram.com/traiiison/'
				target='_blank'
				style={{ color: 'inherit' }}>
				<Instagram sx={{ fontSize: iconSize }} />
			</a>
			<a
				href='https://www.linkedin.com/in/traison-diedrich-b9451a241'
				target='_blank'
				style={{ color: 'inherit' }}>
				<LinkedIn sx={{ fontSize: iconSize }} />
			</a>
			<a
				href='https://github.com/traison-diedrich'
				target='_blank'
				style={{ color: 'inherit' }}>
				<GitHub sx={{ fontSize: iconSize }} />
			</a>
		</Box>
	);
};

export const AppFooter: React.FC = () => {
	return (
		<Box
			sx={{
				width: '100%',
				p: '1.5rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '1rem',
			}}>
			<Typography
				color='text.primary'
				align='center'
				sx={{ fontSize: 'clamp(1rem, 3.5vw, 2.0rem)' }}>
				Enjoying the site? Check out the source at{' '}
				<a
					href='https://github.com/traison-diedrich/portfolio'
					target='_blank'
					style={{ color: 'inherit', textDecoration: 'underline' }}>
					Github
				</a>
			</Typography>
			<IconBox
				sx={{
					width: 'clamp(200px, 80%, 700px)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					color: 'secondary.main',
				}}
			/>
			<Box
				sx={{
					width: 'clamp(200px, 85%, 650px)',
					height: '1px',
					bgcolor: 'secondary.main',
				}}
			/>
			<Box
				sx={{
					display: 'grid',
					placeItems: 'center',
					gap: '.2rem',
					color: 'text.primary',
				}}>
				<Typography
					color='inherit'
					align='center'
					sx={{ fontSize: 'clamp(.75rem, 2.5vw, 1.5rem)' }}>
					&copy; Traison Diedrich 2023 | Made with{' '}
					<FavoriteOutlined sx={{ fontSize: 'inherit' }} /> in Saint Louis
				</Typography>
				<a
					href='#intro'
					style={{ textDecoration: 'underline', color: 'inherit' }}>
					<Typography
						align='center'
						color='inherit'
						sx={{ fontSize: 'clamp(.75rem, 2.5vw, 1.5rem)' }}>
						Back to Top
					</Typography>
				</a>
			</Box>
		</Box>
	);
};
