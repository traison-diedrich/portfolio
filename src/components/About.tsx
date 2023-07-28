import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
	Box,
	BoxProps,
	IconButton,
	Typography,
	TypographyProps,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import * as React from 'react';
import images from '../assets/images';

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

interface MyBoxProps extends BoxProps {
	sliderPosition?: number;
	matches: boolean;
}

const Professional: React.FC<MyBoxProps> = ({ matches, ...props }) => {
	return (
		<Box
			id='right'
			{...props}
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: matches ? 'row' : 'column',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				position: 'absolute',
			}}>
			<Typography variant='h2' color='secondary' align='center'>
				As a Developer
			</Typography>
			<Box sx={{ height: '300px', aspectRatio: 1, bgcolor: 'secondary.main' }}>
				Content!
			</Box>
		</Box>
	);
};

interface Image {
	url: string;
	alt: string;
	caption: string;
}
interface CarouselProps {
	images: Image[];
	matches: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, matches }) => {
	const [imageIndex, setImageIndex] = React.useState(0);

	const prev = () => {
		setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
	};

	const next = () => {
		const prev = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
		const next = imageIndex === images.length - 1 ? 0 : imageIndex + 1;

		const prevImage = document.getElementById(`image-${prev}`);
		const currImage = document.getElementById(`image-${imageIndex}`);
		const nextImage = document.getElementById(`image-${next}`);

		if (prevImage) prevImage.style.opacity = '1';
		if (currImage) currImage.style.left = '150%';
		if (nextImage) {
			nextImage.style.opacity = '0';
			nextImage.style.left = '50%';
		}

		setTimeout(() => {
			setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
		}, 200);
	};

	return (
		<Box
			sx={{
				height: '100%',
				width: '100%',
				border: '2px solid #111111',
				borderRadius: '5px',
				position: 'relative',
				overflow: 'hidden',
			}}>
			{images.map((image, index) => (
				<Box
					key={index}
					id={`image-${index}`}
					component='img'
					src={image.url}
					alt={image.alt}
					sx={{
						height: '400px',
						aspectRatio: 4 / 5,
						objectFit: 'cover',
						borderRadius: '5px',
						position: 'absolute',
						top: '45%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: 0,
						transition: 'opacity 0.5s ease, left 1s ease',
					}}
				/>
			))}
			<Box
				sx={{
					width: '70%',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					position: 'absolute',
					bottom: '5%',
					left: '50%',
					transform: 'translateX(-50%)',
				}}>
				<IconButton onClick={prev}>
					<ChevronLeft />
				</IconButton>
				<Typography variant='subtitle1'>
					{images[imageIndex].caption}
				</Typography>
				<IconButton onClick={next}>
					<ChevronRight />
				</IconButton>
			</Box>
		</Box>
	);
};

const Personal: React.FC<MyBoxProps> = ({
	sliderPosition,
	matches,
	...props
}) => {
	const CarouselImages: Image[] = [
		{
			url: images.rpi,
			alt: 'rpi',
			caption: 'this is a raspberry pi',
		},
		{
			url: images.workoutPlanner,
			alt: 'workout planner',
			caption: 'this is the workout planner',
		},
		{
			url: images.battleBros,
			alt: 'Battle Bros',
			caption: 'these are the battle bros',
		},
	];

	return (
		<Box
			id='left'
			{...props}
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '1rem',
				position: 'absolute',
				zIndex: 2,
				right: `${100 - (sliderPosition || 0)}%`,
				transition: 'right 0.9s ease',
			}}>
			<Typography variant='h2' align='center'>
				Beyond Development
			</Typography>
			<Typography
				variant='h6'
				align='center'
				color='rgba(13, 13, 13, 0.6)'
				sx={{ mb: 2 }}>
				A little more about my interests and background
			</Typography>
			<Carousel images={CarouselImages} matches={matches} />
		</Box>
	);
};

export const About: React.FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

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
			<Personal
				matches={matches}
				sliderPosition={sliderPosition}
				sx={{
					bgcolor: 'secondary.main',
					pl: '20%',
					pr: '10%',
					py: '100px',
				}}
			/>
			<Professional
				matches={matches}
				sx={{
					bgcolor: 'background.default',
					pl: '20%',
					pr: '10%',
					py: '100px',
				}}
			/>
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
