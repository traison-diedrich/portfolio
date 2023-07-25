import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, BoxProps, IconButton, Typography } from '@mui/material';
import * as React from 'react';

interface MovementButtonProps extends BoxProps {
	onLeft: () => void;
	onRight: () => void;
}

function MovementButton({ onLeft, onRight, ...props }: MovementButtonProps) {
	return (
		<Box
			{...props}
			style={{
				borderRadius: '50%',
				height: 'clamp(20px, 15vw, 100px)',
				width: 'clamp(20px, 15vw, 100px)',
				position: 'relative',
			}}>
			<IconButton
				onClick={onLeft}
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '50%',
					height: '100%',
					bgcolor: 'background.default',
					borderRadius: '20rem 0 0 20rem',
					display: 'grid',
					placeItems: 'center',
					'&:hover': {
						bgcolor: '#222222',
					},
				}}>
				<KeyboardArrowLeftIcon color='secondary' sx={{ fontSize: '2rem' }} />
			</IconButton>
			<IconButton
				onClick={onRight}
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					width: '50%',
					height: '100%',
					bgcolor: 'secondary.main',
					borderRadius: '0 20rem 20rem 0',
					display: 'grid',
					placeItems: 'center',
					'&:hover': {
						bgcolor: '#dddddd',
					},
				}}>
				<KeyboardArrowRightIcon color='primary' sx={{ fontSize: '2rem' }} />
			</IconButton>
		</Box>
	);
}

export const About: React.FC = () => {
	const [sliderPosition, setSliderPosition] = React.useState(15);

	return (
		<Box
			id='about'
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
					bgcolor: 'secondary.main',
					display: 'grid',
					placeItems: 'center',
					position: 'absolute',
					zIndex: 2,
					right: `${100 - sliderPosition}%`,
					transition: 'right 0.9s ease',
				}}>
				<Typography variant='h2' color='primary'>
					Personal
				</Typography>
			</Box>
			<Box
				id='right'
				sx={{
					width: '100%',
					height: '100%',
					bgcolor: 'background.default',
					display: 'grid',
					placeItems: 'center',
					overflow: 'hidden',
					position: 'absolute',
				}}>
				<Typography variant='h2' color='secondary'>
					Professional
				</Typography>
			</Box>
			<MovementButton
				onLeft={() => setSliderPosition(15)}
				onRight={() => setSliderPosition(85)}
				sx={{
					position: 'absolute',
					top: '50%',
					left: `${sliderPosition}%`,
					transition: 'left 0.9s ease',
					zIndex: 3,
					offsetPosition: 'left top',
					transform: 'translateX(-50%) translateY(-50%)',
				}}
			/>
		</Box>
	);
};
