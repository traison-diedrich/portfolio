import { Box, Typography } from '@mui/material';
import * as React from 'react';

export const About: React.FC = () => {
	const left = document.getElementById('left');

	const handleOnMove = (event: MouseEvent) => {
		const p = (event.clientX / window.innerWidth) * 100;

		left!.style.width = `${p}%`;
	};

	document.onmousemove = (event: MouseEvent) => handleOnMove(event);

	return (
		<Box
			sx={{
				position: 'relative',
				height: '100vh',
				width: '100%',
				display: 'flex',
			}}>
			<Box
				id='left'
				sx={{
					width: '100%',
					height: '100%',
					bgcolor: 'background.default',
					display: 'grid',
					placeItems: 'center',
					overflow: 'hidden',
					position: 'absolute',
					zIndex: 2,
				}}>
				<Typography variant='h2' color='secondary'>
					Professional
				</Typography>
			</Box>
			<Box
				id='right'
				sx={{
					width: '100%',
					height: '100%',
					bgcolor: 'secondary.main',
					display: 'grid',
					placeItems: 'center',
					overflow: 'hidden',
					position: 'absolute',
				}}>
				<Typography variant='h2' color='primary'>
					Personal
				</Typography>
			</Box>
		</Box>
	);
};
