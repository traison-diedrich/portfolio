import emailjs from '@emailjs/browser';
import { Player } from '@lottiefiles/react-lottie-player';
import ChatIcon from '@mui/icons-material/Chat';
import {
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import airplaneAnimation from '../assets/lotties/airplaneAnimation.json';

const ContactTextField: React.FC<{ title: string; multiline: boolean }> = ({
	title,
	multiline,
}) => {
	return (
		<Box
			sx={{
				width: '100%',
				border: '2px solid #eeeeee',
				borderRadius: '3px',
				p: 2,
				mb: 2,
			}}>
			<TextField
				variant='standard'
				placeholder={title}
				name={title}
				multiline={multiline}
				rows={multiline ? 2 : 0}
				fullWidth
				required
			/>
		</Box>
	);
};

const ContactForm: React.FC = () => {
	const [waiting, setWaiting] = React.useState(false);

	const form = React.useRef<HTMLFormElement | null>(null);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		emailjs
			.sendForm(
				'contact_service',
				'template_81qjt6b',
				form.current!,
				'hE5Dbdlgu8NPJxtY_'
			)
			.then(
				(result) => {
					console.log(result.text);
					event.currentTarget.reset();
				},
				(error) => {
					console.log(error);
				}
			);
	};

	return (
		<Box
			component='form'
			onSubmit={onSubmit}
			ref={form}
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				p: '10%',
			}}>
			<ContactTextField title='Name' multiline={false} />
			<ContactTextField title='Email' multiline={false} />
			<ContactTextField title='Message' multiline={true} />

			{waiting ? (
				<CircularProgress color='secondary' />
			) : (
				<Button type='submit' variant='contained' color='secondary'>
					Submit
				</Button>
			)}
			<CircularProgress color='secondary' />
		</Box>
	);
};

export const Test: React.FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Box
			sx={{
				height: matches ? '100vh' : '150vh',
				minWidth: '100%',
				bgcolor: 'secondary.main',
				display: 'flex',
				flexDirection: matches ? 'row' : 'column',
				p: 5,
			}}>
			<Box
				sx={{
					minWidth: matches ? '50%' : '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}>
				<Box display='flex' alignItems='center'>
					<Typography variant='h3' align='center'>
						Let's Get in Touch
					</Typography>
					<ChatIcon sx={{ fontSize: '3.0rem', ml: 1, mt: 1 }} />
				</Box>
			</Box>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
					mt: matches ? 0 : 5,
					ml: matches ? 5 : 0,
				}}>
				<Player
					src={airplaneAnimation}
					className='player'
					loop
					autoplay
					speed={0.5}
					style={{
						width: '100%',
						height: '15vh',
					}}
					rendererSettings={{
						preserveAspectRatio: 'none',
					}}
				/>
				<Box
					sx={{
						height: '100%',
						width: '100%',
						bgcolor: 'background.default',
						borderRadius: '5px',
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography
						variant='h3'
						color='secondary'
						align='center'
						sx={{ mb: 2 }}>
						Contact Me
					</Typography>
					<ContactForm />
				</Box>
			</Box>
		</Box>
	);
};
