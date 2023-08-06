import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import ConstructionIcon from '@mui/icons-material/Construction';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import {
	Box,
	BoxProps,
	IconButton,
	MobileStepper,
	Typography,
	TypographyProps,
} from '@mui/material';
import * as React from 'react';
import { useBreakpoint } from '../BreakpointProvider';
import images from '../assets/images';

interface MyBoxProps extends BoxProps {
	sliderPosition?: number;
}

/**
 * TODO:
 * [ ] : link to github
 * [ ] : link to serve resume
 * [ ] : frontend skills
 * [ ] : backend skills
 * [ ] : other skills
 */

interface SkillCardProps extends BoxProps {
	title: string;
	Icon: React.ElementType;
	skills: string[];
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
}

// This card hover effect is a mess and a half,
// don't ever do it again or at least speak to a
// professional first lmao
const SkillCard: React.FC<SkillCardProps> = ({
	title,
	Icon,
	skills,
	expanded,
	setExpanded,
	...props
}) => {
	const cardRef = React.useRef<HTMLElement | null>(null);

	React.useEffect(() => {
		const adjustCardWidth = () => {
			if (cardRef.current && !expanded) {
				const parentHeight = cardRef.current.parentElement?.clientHeight;
				const height = 0.33 * parentHeight!;
				const parentWidth = cardRef.current.parentElement?.clientWidth;
				const calcWidth = 1.25 * height;
				const width = calcWidth > parentWidth! ? parentWidth! : calcWidth;
				cardRef.current.style.width = `${width}px`;
			} else if (cardRef.current) {
				cardRef.current.style.width = '100%';
			}
		};

		adjustCardWidth(); // Initial effect

		window.addEventListener('resize', adjustCardWidth); // Add resize event listener

		return () => {
			window.removeEventListener('resize', adjustCardWidth); // Clean up event listener
		};
	}, [expanded]);

	return (
		<Box
			{...props}
			ref={cardRef}
			style={{
				height: expanded ? '100%' : '33%',
				width: '100%',
				maxWidth: '600px',
				position: 'absolute',
				top: expanded ? 0 : '',
				left: '50%',
				transform: 'translateX(-50%)',
				transition: 'all 0.9s ease',
				zIndex: expanded ? 2 : 1,
				paddingTop: '4rem',
				overflow: 'hidden',
			}}>
			<Box
				onClick={() => setExpanded(true)}
				sx={{
					cursor: expanded ? '' : 'pointer',
					width: '100%',
					height: '100%',
					bgcolor: 'secondary.main',
					display: 'grid',
					placeItems: 'center',
					transition: 'all 0.9s ease',
					borderRadius: '5px',
					position: 'relative',
				}}>
				<Box
					sx={{
						height: '25%',
						aspectRatio: 1,
						position: 'absolute',
						top: expanded ? '5%' : '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						transition: 'top 0.9s ease',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						bgcolor: 'secondary.main',
						borderRadius: '50%',
					}}>
					<Icon
						sx={{
							fontSize: '4rem',
						}}
					/>
					<Typography variant='h5' align='center' whiteSpace='nowrap'>
						{title}
					</Typography>
				</Box>
				<IconButton
					sx={{
						position: 'absolute',
						top: '.5rem',
						right: '.5rem',
						opacity: expanded ? 1 : 0,
						transition: 'opacity 0.9s ease',
					}}
					onClick={(event) => {
						event.stopPropagation();
						setExpanded(false);
					}}>
					<Close />
				</IconButton>
				<Box
					sx={{
						position: 'absolute',
						top: '18%',
						left: 0,
						width: expanded ? '100%' : 0,
						height: '8px',
						bgcolor: 'background.default',
						transition: expanded ? 'width 1.4s ease-in' : '',
					}}
				/>
				<Box
					sx={{
						height: '80%',
						width: '100%',
						position: 'absolute',
						top: expanded ? '60%' : '100%',
						left: '50%',
						transform: expanded
							? 'translate(-50%, -50%)'
							: 'translate(-50%, 0)',
						transition: 'all 0.9s ease',
						display: 'grid',
						gap: '10px',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gridTemplateRows: 'masonry',
						p: 2,
					}}>
					{skills.map((skill, index) => {
						const randomHeight = Math.floor(Math.random() * 31) + 20;
						return (
							<Box
								key={index}
								sx={{
									display: 'grid',
									placeItems: 'center',
									bgcolor: 'background.default',
									borderRadius: '1rem',
									height: `${randomHeight}%`,
								}}>
								<Typography sx={{ color: 'text.primary' }}>{skill}</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

const Professional: React.FC<MyBoxProps> = ({ ...props }) => {
	const [expandedStates, setExpandedStates] = React.useState([
		false,
		false,
		false,
	]);

	const anyExpanded = expandedStates.some((expanded) => expanded);

	const handleExpansion = (index: number, expanded: boolean) => {
		setExpandedStates((prevExpandedStates) => {
			const newExpandedStates = [...prevExpandedStates];
			newExpandedStates[index] = expanded;
			return newExpandedStates;
		});
	};

	const FrontendCardProps: SkillCardProps = {
		title: 'Frontend',
		Icon: WebIcon,
		skills: ['React', 'Material-UI', 'HTML', 'CSS', 'JavaScript'],
		expanded: expandedStates[0],
		setExpanded: (expanded) => handleExpansion(0, expanded),
		sx: {
			top: 0,
		},
	};

	const BackendCardProps: SkillCardProps = {
		title: 'Backend',
		Icon: StorageIcon,
		skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
		expanded: expandedStates[1],
		setExpanded: (expanded) => handleExpansion(1, expanded),
		sx: {
			top: '33%',
		},
	};

	const OtherCardProps: SkillCardProps = {
		title: 'Other',
		Icon: ConstructionIcon,
		skills: ['Python', 'Java', 'C++', 'Git', 'Docker'],
		expanded: expandedStates[2],
		setExpanded: (expanded) => handleExpansion(2, expanded),
		sx: {
			top: '66%',
		},
	};

	return (
		<Box
			id='right'
			{...props}
			style={{
				height: '100%',
				width: '100%',
				overflow: 'hidden',
				position: 'absolute',
			}}>
			<Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						display: 'grid',
						placeItems: 'center',
						gap: '.5rem',
						width: '100%',
						opacity: anyExpanded ? 0 : 1,
						transition: 'opacity 0.9s ease',
					}}>
					<Typography
						variant='h4'
						align='center'
						sx={{ color: 'text.primary' }}>
						As a Developer
					</Typography>
					<Typography
						variant='subtitle1'
						align='center'
						sx={{ color: 'text.secondary' }}>
						My skills and experience
					</Typography>
				</Box>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						position: 'relative',
					}}>
					<SkillCard {...FrontendCardProps} />
					<SkillCard {...BackendCardProps} />
					<SkillCard {...OtherCardProps} />
				</Box>
			</Box>
		</Box>
	);
};

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

const Personal: React.FC<MyBoxProps> = ({ sliderPosition, ...props }) => {
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
