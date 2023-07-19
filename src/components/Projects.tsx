import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import * as React from 'react';
import battleBros from '../assets/battleBros.png';
import checkin from '../assets/checkin.jpeg';
import hybridImages from '../assets/hybridImages.png';
import {
	BootstrapIcon,
	JavaIcon,
	MuiIcon,
	OpencvIcon,
	PostgreIcon,
	PythonIcon,
	RaspberryPiIcon,
	ReactIcon,
} from '../assets/icons';
import rpi from '../assets/rpi.jpg';
import workoutPlanner from '../assets/workoutPlanner.jpg';

const icons = {
	BootstrapIcon,
	JavaIcon,
	MuiIcon,
	OpencvIcon,
	PostgreIcon,
	PythonIcon,
	ReactIcon,
	RaspberryPiIcon,
};

type IconName = keyof typeof icons;

interface DynamicIconProps {
	name: IconName;
}

function DynamicIcon({ name }: DynamicIconProps) {
	const Icon = icons[name];
	return Icon ? (
		<Icon
			sx={{
				fontSize: '2.8rem',
				bgcolor: 'background.default',
				p: 0.8,
				mr: 1,
				borderRadius: '25%',
			}}
		/>
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
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<Card
			variant='outlined'
			sx={{
				width: 400,
				height: 420,
				transition: 'box-shadow 0.3s',
				'&:hover': {
					boxShadow: isHovered
						? '0px 7px 29px 0px rgba(221, 221, 221, 0.5)'
						: 'none',
				},
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<CardMedia
				component='a'
				href={props.url}
				target='_blank'
				sx={{
					height: '250px',
					width: '100%',
					objectFit: 'cover',
				}}
				image={props.image}
			/>
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
							}}>
							{props.icons.map((iconName, index) => (
								<DynamicIcon key={index} name={iconName} />
							))}
						</Box>
					</Box>
					<Typography variant='body1' color='primary'>
						{props.subtitle}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export const Projects: React.FC = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				p: 5,
			}}>
			<Typography variant='h2' color='secondary' sx={{ mb: 4 }}>
				Recent Work
			</Typography>
			<Grid container spacing={3} direction='row' justifyContent='center'>
				<Grid item>
					<ProjectCard
						title='Workout Planner'
						url='https://workout-planner.fit'
						image={workoutPlanner}
						subtitle='My first application, using React and Supabase to
						create a workout planner with user authentication'
						icons={['ReactIcon', 'MuiIcon', 'PostgreIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Pi4Micronaut'
						url='https://github.com/oss-slu/Pi4Micronaut'
						image={rpi}
						subtitle="A library integrating the Micronaut Framework, 
							Raspberry Pi's, and hardware to create Iot Applications"
						icons={['JavaIcon', 'RaspberryPiIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Check-in System'
						url='https://github.com/oss-slu/SLU_OSS_CheckIn'
						image={checkin}
						subtitle='The first ever implementation of Pi4Micronaut 
						 	to create a remote-monitoring check-in system'
						icons={['JavaIcon', 'BootstrapIcon', 'RaspberryPiIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Battle Bros'
						url='https://github.com/traison-diedrich/software-design'
						image={battleBros}
						subtitle='A group project using java to create a playable 
						2D fighter.'
						icons={['JavaIcon']}
					/>
				</Grid>
				<Grid item>
					<ProjectCard
						title='Hybrid Images'
						url='https://github.com/traison-diedrich/computer-vision/tree/main/homework2'
						image={hybridImages}
						subtitle='A python program using opencv to combine two images using 
							Sobel operations and Fourier transform'
						icons={['PythonIcon', 'OpencvIcon']}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
