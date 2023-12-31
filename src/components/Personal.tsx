import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
	Box,
	BoxProps,
	IconButton,
	MobileStepper,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useBreakpoint } from '../BreakpointProvider';
import images from '../assets/images';

interface ImageSliderProps extends BoxProps {
	images: string[];
	curr: number;
	reverse: boolean;
	matches: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
	images,
	curr,
	reverse,
	matches,
	...props
}) => {
	let mappedImages = images;

	if (reverse) {
		mappedImages = images.slice().reverse();
	}

	return (
		<Box
			{...props}
			style={{
				position: 'relative',
				overflow: 'hidden',
			}}>
			<Box
				sx={{
					display: 'flex',
					transform: reverse
						? `translateX(-${(mappedImages.length - curr - 1) * 100}%)`
						: `translateX(-${curr * 100}%)`,
					transition: 'transform 1s ease',
				}}>
				{mappedImages.map((image, index) => (
					<Box
						component='img'
						loading='lazy'
						key={index}
						src={image}
						sx={{
							width: '100%',
							aspectRatio: 4 / 5,
							objectFit: 'cover',
							borderRadius: matches ? '5px' : '5px 5px 0 0',
						}}
					/>
				))}
			</Box>
		</Box>
	);
};

interface CarouselProps {
	images1: string[];
	images2: string[];
	captions: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images1, images2, captions }) => {
	const breakpoint = useBreakpoint();
	const matches = breakpoint === 'large';

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
				maxWidth: breakpoint === 'large' ? '1100px' : '450px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center',
				gap: '1rem',
				pt: matches ? '2rem' : '',
				pb: 1,
				bgcolor: 'background.default',
				borderRadius: '5px',
				position: 'relative',
			}}>
			<Box display='flex' justifyContent='center' gap='8%'>
				<ImageSlider
					images={images1}
					curr={curr}
					reverse={false}
					matches={matches}
					sx={{
						width: matches ? '42%' : '100%',
					}}
				/>
				{matches && (
					<ImageSlider
						images={images2}
						curr={curr}
						reverse={true}
						matches={matches}
						sx={{ width: matches ? '42%' : '100%' }}
					/>
				)}
			</Box>
			<IconButton
				color='secondary'
				onClick={prev}
				sx={{
					position: 'absolute',
					top: '38%',
					left: matches ? '4%' : 0,
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
					backgroundColor: 'rgba(13, 13, 13, 0.3)',
					'&:hover': {
						backgroundColor: 'rgba(13, 13, 13, 0.5)',
					},
				}}>
				<ChevronLeft sx={{ fontSize: '2.2rem' }} />
			</IconButton>
			<IconButton
				color='secondary'
				onClick={next}
				sx={{
					position: 'absolute',
					top: '38%',
					right: matches ? '4%' : 0,
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
					backgroundColor: 'rgba(13, 13, 13, 0.3)',
					'&:hover': {
						backgroundColor: 'rgba(13, 13, 13, 0.5)',
					},
				}}>
				<ChevronRight sx={{ fontSize: '2.2rem' }} />
			</IconButton>
			<Typography
				color='text.primary'
				variant='body1'
				align='center'
				sx={{
					width: matches ? '55%' : '90%',
					height:
						breakpoint === 'large'
							? '60px'
							: breakpoint === 'small'
							? '70px'
							: '90px',
				}}>
				{captions[curr]}
			</Typography>
			<MobileStepper
				steps={images1.length}
				position='static'
				activeStep={curr}
				nextButton={null}
				backButton={null}
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
		</Box>
	);
};

interface MyBoxProps extends BoxProps {
	sliderPosition?: number;
}

export const Personal: React.FC<MyBoxProps> = ({
	sliderPosition,
	...props
}) => {
	const PrimaryImages: string[] = [
		images.graduation1,
		images.bodybuilding1,
		images.cole1,
		images.family2,
		images.nature1,
	];

	const SecondaryImages: string[] = [
		images.graduation2,
		images.bodybuilding2,
		images.cole2,
		images.family1,
		images.nature2,
	];

	// for now, if one of these captions changes, the height of the captions
	// in the carousel also needs to change
	const captions: string[] = [
		'I recently graduated from Saint Louis University with my Bachelor of Arts in Computer Science.',
		'Bodybuilding is what inspired my most recent app, Workout Planner. Combining fitness and technology is what I do.',
		"I'm a proud father to a goofy Aussie-Doodle, Cole",
		"I'm one of four, and I have two amazing nieces. Family plays a big role in my life.",
		'In what time I have left, I love to get out and explore the world.',
	];

	return (
		<Box
			id='left'
			{...props}
			style={{
				height: '100%',
				width: '100%',
				position: 'absolute',
				zIndex: 3,
				right: `${100 - (sliderPosition || 0)}%`,
				transition: 'right 0.9s ease',
			}}>
			<Box
				sx={{
					height: '100%',
					width: '100%',
					position: 'relative',
					display: 'grid',
					placeItems: 'center',
					pt: '10vh',
				}}>
				<Box
					sx={{
						display: 'grid',
						placeItems: 'center',
						gap: '1rem',
						position: 'absolute',
						top: 0,
					}}>
					<Typography variant='h4' align='center'>
						Beyond Development
					</Typography>
					<Typography
						color='rgba(17,17,17, 0.6)'
						variant='subtitle1'
						align='center'>
						My life and interests outside of coding
					</Typography>
				</Box>
				<Carousel
					images1={PrimaryImages}
					images2={SecondaryImages}
					captions={captions}
				/>
			</Box>
		</Box>
	);
};
