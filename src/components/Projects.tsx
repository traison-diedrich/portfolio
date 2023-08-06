import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Popper,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useBreakpoint } from '../BreakpointProvider';
import icons from '../assets/icons';
import images from '../assets/images';

type IconName = keyof typeof icons;

interface DynamicIconProps {
	name: IconName;
}

function DynamicIcon({ name }: DynamicIconProps) {
	const Icon = icons[name];
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMouse = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	return Icon ? (
		<Box onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
			<Icon
				sx={{
					fontSize: '2.8rem',
					bgcolor: 'background.default',
					p: 0.8,
					borderRadius: '25%',
				}}
			/>
			{/* FIXME: popover says visible if user scrolls away with
				mouse in the same position */}
			<Popper open={open} anchorEl={anchorEl}>
				<Box sx={{ bgcolor: 'background.default', px: 1, borderRadius: '3px' }}>
					<Typography variant='subtitle1' color='secondary'>
						{name.toString().slice(0, -4)}
					</Typography>
				</Box>
			</Popper>
		</Box>
	) : null;
}

interface CardProps {
	image: string;
	url: string;
	title: string;
	subtitle: string;
	icons: IconName[];
}

const ProjectCard: React.FC<CardProps> = (props) => {
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'mobile';

	const [cardHovered, setCardHovered] = React.useState(false);
	const [imgHovered, setImgHovered] = React.useState(false);

	// TODO: Card should keep track of if it is visible and slide in or out
	// need to see how this might work with grid

	return (
		<Card
			variant='outlined'
			sx={{
				borderColor: 'background.default',
				width: '80vw',
				maxWidth: 400,
				height: '100%',
				transition: 'box-shadow 0.3s',
				'&:hover': {
					boxShadow: cardHovered
						? '0px 7px 29px 0px rgba(221, 221, 221, 0.5)'
						: 'none',
				},
			}}
			onMouseEnter={() => setCardHovered(true)}
			onMouseLeave={() => setCardHovered(false)}>
			<CardMedia
				component='a'
				href={props.url}
				target='_blank'
				sx={{
					aspectRatio: 7 / 4,
					width: '100%',
					objectFit: 'cover',
					textDecoration: 'none',
				}}
				image={props.image}
				onMouseEnter={() => setImgHovered(true)}
				onMouseLeave={() => setImgHovered(false)}>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						bgcolor: 'rgba(0, 0, 0, 0.3)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						opacity: imgHovered ? 1 : 0,
						transition: 'opacity 0.4s',
					}}>
					<Box sx={{ p: 1, bgcolor: 'secondary.main', borderRadius: '3px' }}>
						<Typography color='primary' variant='subtitle1'>
							View Project
						</Typography>
					</Box>
				</Box>
			</CardMedia>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						height: '100%',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
					<Box
						display='flex'
						sx={{ flexDirection: mobile ? 'column' : 'row', gap: '.5rem' }}>
						<a
							href={props.url}
							target='_blank'
							style={{ textDecoration: 'none' }}>
							<Typography fontSize='clamp(1rem, 8vw, 2rem)' color='primary'>
								{props.title}
							</Typography>
						</a>
						<Box
							sx={{
								display: 'flex',
								marginLeft: mobile ? '' : 'auto',
								gap: '.5rem',
								justifyContent: mobile ? 'flex-start' : 'center',
								alignItems: 'flex-start',
							}}>
							{props.icons.map((iconName, index) => (
								<DynamicIcon key={index} name={iconName} />
							))}
						</Box>
					</Box>
					<Typography variant='body1' color='primary' sx={{ mt: 1 }}>
						{props.subtitle}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

// TODO: I think the background here should be a simple parallax
// to keep things from being stale
export const Projects: React.FC = () => {
	const breakpoint = useBreakpoint();

	return (
		<Box
			id='projects'
			className='scroll-target'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				py: 5,
				px: breakpoint === 'mobile' ? 0 : 5,
				backgroundImage: 'linear-gradient(to bottom, #111111 30%, #eeeeee 70%)',
			}}>
			<Typography
				color='secondary'
				sx={{ fontSize: 'clamp(1rem, 10vw, 4rem)', mb: 4 }}>
				Recent Projects
			</Typography>
			{/* TODO: Long term I would like to be able to implement a slide-in 
			slide-out effect here based on the visibility of the card. Note, 
			using grid means that a row would have to slide in rather than just 1 
			card */}
			<Grid container spacing={6} direction='row' justifyContent='center'>
				<Grid item>
					<ProjectCard
						title='Workout Planner'
						url='https://workout-planner.fit'
						image={images.workoutPlanner}
						subtitle='My first application, using React and Supabase to
						create a workout planner with user authentication'
						icons={[
							'MaterialUIIcon',
							'TypeScriptIcon',
							'ReactIcon',
							'PostgreSQLIcon',
						]}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Pi4Micronaut'
						url='https://github.com/oss-slu/Pi4Micronaut'
						image={images.rpi}
						subtitle="A library integrating the Micronaut Framework, 
							Raspberry Pi's, and hardware to create flexible 
							IOT Applications"
						icons={['JavaIcon', 'MicronautIcon', 'RaspberryPiIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Check-in System'
						url='https://github.com/oss-slu/SLU_OSS_CheckIn'
						image={images.checkin}
						subtitle='The first ever implementation of Pi4Micronaut 
						 	to create a remote-monitoring check-in system'
						icons={[
							'BootstrapIcon',
							'JavaIcon',
							'MicronautIcon',
							'RaspberryPiIcon',
						]}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Hybrid Images'
						url='https://github.com/traison-diedrich/computer-vision/tree/main/homework2'
						image={images.hybridImages}
						subtitle='A Python program using OpenCV to combine two images
						 using Sobel Operations and Fourier Transform'
						icons={['PythonIcon', 'OpenCVIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Battle Bros'
						url='https://github.com/traison-diedrich/software-design'
						image={images.battleBros}
						subtitle='A group project using Java to create a playable 
						2D fighter.'
						icons={['JavaIcon']}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
