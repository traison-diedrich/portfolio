import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Popover,
	Typography,
} from '@mui/material';
import * as React from 'react';
import battleBros from '../assets/battleBros.png';
import checkin from '../assets/checkin.jpeg';
import hybridImages from '../assets/hybridImages.png';
import {
	BootstrapIcon,
	JavaIcon,
	MaterialUIIcon,
	MicronautIcon,
	OpenCVIcon,
	PostgreSQLIcon,
	PythonIcon,
	RaspberryPiIcon,
	ReactIcon,
	TypeScriptIcon,
} from '../assets/icons';
import rpi from '../assets/rpi.jpg';
import workoutPlanner from '../assets/workoutPlanner.jpg';

const icons = {
	BootstrapIcon,
	JavaIcon,
	MaterialUIIcon,
	OpenCVIcon,
	PostgreSQLIcon,
	PythonIcon,
	ReactIcon,
	RaspberryPiIcon,
	TypeScriptIcon,
	MicronautIcon,
};

type IconName = keyof typeof icons;

interface DynamicIconProps {
	name: IconName;
}
function DynamicIcon({ name }: DynamicIconProps) {
	const Icon = icons[name];
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return Icon ? (
		<Box onMouseEnter={handleOpen} onMouseLeave={handleClose}>
			<Icon
				sx={{
					fontSize: '2.8rem',
					bgcolor: 'background.default',
					p: 0.8,
					borderRadius: '25%',
				}}
			/>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				sx={{ pointerEvents: 'none' }}
				disableRestoreFocus>
				<Typography variant='subtitle1' color='primary' sx={{ p: 1 }}>
					{name.toString().slice(0, -4)}
				</Typography>
			</Popover>
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
	const [cardHovered, setCardHovered] = React.useState(false);
	const [imgHovered, setImgHovered] = React.useState(false);

	// TODO: Card should keep track of if it is visible and slide in or out
	// need to see how this might work with grid

	return (
		<Card
			variant='outlined'
			sx={{
				width: 400,
				height: 420,
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
					height: '250px',
					width: '100%',
					objectFit: 'fill',
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
			<CardContent sx={{ height: 170 }}>
				<Box
					sx={{
						display: 'flex',
						height: '100%',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
					<Box display='flex'>
						<Typography variant='h4' color='primary'>
							{props.title}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								marginLeft: 'auto',
								gap: '.5rem',
								justifyContent: 'center',
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
	return (
		<Box
			id='projects'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				p: 5,
			}}>
			<Typography variant='h2' color='secondary' sx={{ mb: 4 }}>
				Recent Projects
			</Typography>
			<Grid container spacing={10} direction='row' justifyContent='center'>
				<Grid item>
					<ProjectCard
						title='Workout Planner'
						url='https://workout-planner.fit'
						image={workoutPlanner}
						subtitle='My first application, using React and Supabase to
						create a workout planner with user authentication'
						icons={[
							'ReactIcon',
							'TypeScriptIcon',
							'MaterialUIIcon',
							'PostgreSQLIcon',
						]}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Pi4Micronaut'
						url='https://github.com/oss-slu/Pi4Micronaut'
						image={rpi}
						subtitle="A library integrating the Micronaut Framework, 
							Raspberry Pi's, and hardware to create IOT Applications"
						icons={['JavaIcon', 'RaspberryPiIcon', 'MicronautIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Check-in System'
						url='https://github.com/oss-slu/SLU_OSS_CheckIn'
						image={checkin}
						subtitle='The first ever implementation of Pi4Micronaut 
						 	to create a remote-monitoring check-in system'
						icons={[
							'JavaIcon',
							'BootstrapIcon',
							'RaspberryPiIcon',
							'MicronautIcon',
						]}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Hybrid Images'
						url='https://github.com/traison-diedrich/computer-vision/tree/main/homework2'
						image={hybridImages}
						subtitle='A Python program using OpenCV to combine two images using 
							Sobel Operations and Fourier Transform'
						icons={['PythonIcon', 'OpenCVIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Battle Bros'
						url='https://github.com/traison-diedrich/software-design'
						image={battleBros}
						subtitle='A group project using Java to create a playable 
						2D fighter.'
						icons={['JavaIcon']}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
