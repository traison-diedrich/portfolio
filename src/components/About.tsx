import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
	Box,
	BoxProps,
	IconButton,
	Typography,
	TypographyProps,
} from '@mui/material';
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

interface VerticalTextProps extends TypographyProps {
	text: string;
}

const VerticalText: React.FC<VerticalTextProps> = ({ text, ...props }) => {
	return (
		<Typography
			{...props}
			style={{
				fontSize: 'clamp(2rem, 5vw, 2.5rem)',
				width: '60px',
				writingMode: 'vertical-lr',
				textOrientation: 'upright',
				position: 'absolute',
				transition: 'left 0.9s ease, transform 0.9s ease, color 0.9s ease',
				zIndex: 3,
				display: 'flex',
				alignItems: 'center',
			}}>
			{text}
		</Typography>
	);
};

export const About: React.FC = () => {
	const [sliderPosition, setSliderPosition] = React.useState(10);

	const isLeft = sliderPosition < 50;

	return (
		<Box
			id='about'
			className='scroll-target'
			sx={{
				position: 'relative',
				width: '100%',
				height: '100vh',
				minHeight: '730px',
				overflow: 'hidden',
			}}>
			<Box
				id='left'
				sx={{
					height: '100%',
					width: '100%',
					bgcolor: 'secondary.main',
					display: 'flex',
					placeItems: 'center',
					position: 'absolute',
					zIndex: 2,
					right: `${100 - sliderPosition}%`,
					transition: 'right 0.9s ease',
					pl: '10%',
					pr: '20%',
					py: '100px',
				}}>
				<Typography variant='h2' color='primary'>
					Personal
				</Typography>
			</Box>
			<Box
				id='right'
				sx={{
					height: '100%',
					width: '100%',
					bgcolor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					overflow: 'hidden',
					position: 'absolute',
					pl: '20%',
					pr: '10%',
					py: '100px',
				}}>
				<Box sx={{ height: 300, width: '100%', bgcolor: 'secondary.main' }}>
					There is content here
				</Box>
			</Box>
			<VerticalText
				text='ABOUT'
				sx={{
					color: isLeft ? 'primary.main' : 'secondary.main',
					bottom: '56%',
					left: `${sliderPosition}%`,
					transform: isLeft ? 'translateX(-100%)' : '',
				}}
			/>
			<VerticalText
				text='ME'
				sx={{
					color: isLeft ? 'primary.main' : 'secondary.main',
					top: '56%',
					left: `${sliderPosition}%`,
					transform: isLeft ? 'translateX(-100%)' : '',
				}}
			/>
			<MovementButton
				onLeft={() => setSliderPosition(10)}
				onRight={() => setSliderPosition(90)}
				sx={{
					position: 'absolute',
					top: '50%',
					left: `${sliderPosition}%`,
					transition: 'left 0.9s ease',
					zIndex: 3,
					transform: 'translateX(-50%) translateY(-50%)',
				}}
			/>
		</Box>
	);
};
