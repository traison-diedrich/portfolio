import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
	Box,
	BoxProps,
	IconButton,
	MobileStepper,
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
}
interface CarouselProps {
	images1: Image[];
	images2: Image[];
	captions: string[];
	matches: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
	images1,
	images2,
	captions,
	matches,
}) => {
	const [curr, setCurr] = React.useState(0);

	const prev = () => {
		setCurr(curr === 0 ? images1.length - 1 : curr - 1);
	};

	const next = () => {
		setCurr(curr === images1.length - 1 ? 0 : curr + 1);
	};

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '360px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: '2rem',
				p: '10%',
				bgcolor: '#999999',
				borderRadius: '5px',
			}}>
			<Box
				sx={{
					width: '100%',
					position: 'relative',
					overflow: 'hidden',
				}}>
				<Box
					sx={{
						display: 'flex',
						transform: `translateX(-${curr * 100}%)`,
						transition: 'transform 1s ease',
					}}>
					{images1.map((image) => (
						<Box
							component='img'
							src={image.url}
							alt={image.alt}
							sx={{
								width: '100%',
								aspectRatio: 4 / 5,
								objectFit: 'cover',
								borderRadius: '5px 5px 0 0',
							}}
						/>
					))}
				</Box>
				<MobileStepper
					steps={images1.length}
					position='static'
					activeStep={curr}
					nextButton={
						<IconButton color='secondary' onClick={next}>
							<ChevronRight />
						</IconButton>
					}
					backButton={
						<IconButton color='secondary' onClick={prev}>
							<ChevronLeft />
						</IconButton>
					}
					sx={{
						borderRadius: '0 0 5px 5px',
						'& .MuiMobileStepper-dotActive': {
							backgroundColor: '#eeeeee!important',
						},
						'& .MuiMobileStepper-dot': {
							backgroundColor: 'text.secondary',
						},
					}}
				/>
				{/* <Box
					sx={{
						width: imageWidth,
						height: '100%',
						position: 'relative',
						overflow: 'hidden',
					}}>
					<Box
						sx={{
							display: 'flex',
							transform: `translateX(-${(images2.length - curr - 1) * 100}%)`,
							transition: 'transform 1s ease',
						}}>
						{images2
							.slice()
							.reverse()
							.map((image) => (
								<Box
									component='img'
									src={image.url}
									alt={image.alt}
									sx={{
										width: imageWidth,
										aspectRatio: 4 / 5,
										objectFit: 'cover',
										borderRadius: '5px',
									}}
								/>
								))}
								</Box>
							</Box> */}
			</Box>
			<Typography variant='body1' align='center'>
				{captions[curr]}
			</Typography>
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
		},
		{
			url: images.workoutPlanner,
			alt: 'workout planner',
		},
		{
			url: images.battleBros,
			alt: 'Battle Bros',
		},
	];

	const captions: string[] = [
		'this is a raspberry pi',
		'this is the workout planner',
		'these are the battle bros',
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
			<Typography variant='h3' align='center' sx={{ mb: 4 }}>
				Beyond Development
			</Typography>
			<Carousel
				images1={CarouselImages}
				images2={CarouselImages}
				captions={captions}
				matches={matches}
			/>
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
				minHeight: '900px',
				overflow: 'hidden',
			}}>
			<Personal
				matches={matches}
				sliderPosition={sliderPosition}
				sx={{
					bgcolor: 'secondary.main',
					pl: '20%',
					pr: '10%',
					py: '50px',
				}}
			/>
			<Professional
				matches={matches}
				sx={{
					bgcolor: 'background.default',
					pl: '20%',
					pr: '10%',
					py: '50px',
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
