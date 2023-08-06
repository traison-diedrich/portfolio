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
import { useBreakpoint } from '../BreakpointProvider';
import { Personal } from './Personal';
import { Professional } from './Professional';

/**
 * TODO:
 * [ ] : link to github
 * [ ] : link to serve resume
 * [ ] : frontend skills
 * [ ] : backend skills
 * [ ] : other skills
 */

interface MovementButtonProps extends BoxProps {
	onLeft: () => void;
	onRight: () => void;
}

const MovementButton: React.FC<MovementButtonProps> = ({
	onLeft,
	onRight,
	...props
}) => {
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
};

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
	const breakpoint = useBreakpoint();

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
				minHeight: '900px',
				overflow: 'hidden',
			}}>
			<Personal
				sliderPosition={sliderPosition}
				sx={{
					bgcolor: 'secondary.main',
					pl: '20%',
					pr: '10%',
					py: '50px',
				}}
			/>
			<Professional
				sx={{
					bgcolor: 'background.default',
					pl: '20%',
					pr: '10%',
					py: '50px',
					transition: 'padding 0.9s ease',
				}}
			/>
			<VerticalText
				text='ABOUT'
				sx={{
					color: isLeft ? 'primary.main' : 'secondary.main',
					bottom: '56%',
					left: `${
						sliderPosition + (breakpoint === 'mobile' ? (isLeft ? 3 : -3) : 0)
					}%`,
					transform: isLeft ? 'translateX(-100%)' : '',
				}}
			/>
			<VerticalText
				text='ME'
				sx={{
					color: isLeft ? 'primary.main' : 'secondary.main',
					top: '56%',
					left: `${
						sliderPosition + (breakpoint === 'mobile' ? (isLeft ? 3 : -3) : 0)
					}%`,
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
