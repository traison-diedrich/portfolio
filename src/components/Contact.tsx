import emailjs from '@emailjs/browser';
import { Player } from '@lottiefiles/react-lottie-player';
import {
	ArrowForwardIos,
	Email,
	Instagram,
	LinkedIn,
} from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Snackbar,
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
				width: '90%',
				border: '2px solid #eeeeee',
				borderRadius: '3px',
				p: 2,
				mb: 2,
			}}>
			{/* TODO: the placeholder value is still way too transparent to be legible */}
			<TextField
				variant='standard'
				placeholder={title}
				name={title}
				multiline={multiline}
				rows={multiline ? 3 : 0}
				fullWidth
				required
			/>
		</Box>
	);
};

const ContactForm: React.FC = () => {
	const [waiting, setWaiting] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const form = React.useRef<HTMLFormElement | null>(null);

	const successMessage =
		"Thanks for your message! You'll be hearing back from me soon.";
	const errorMessage =
		'Something went wrong. Please try again or contact me elsewhere.';

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setWaiting(true);

		emailjs
			.sendForm(
				'contact_service',
				'template_81qjt6b',
				form.current!,
				'hE5Dbdlgu8NPJxtY_'
			)
			.then(
				(result) => {
					setMessage(successMessage);
					console.log(result.text);
				},
				(error) => {
					setMessage(errorMessage);
					console.log(error);
				}
			)
			.finally(() => {
				setWaiting(false);
			});

		event.currentTarget.reset();
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

			<Typography variant='body1' color='secondary' align='center'>
				{message}
			</Typography>

			<Button
				type='submit'
				variant='contained'
				color='secondary'
				sx={{ width: '40%', mt: message.length > 0 ? 2 : 6 }}>
				{waiting ? <CircularProgress size={24} color='primary' /> : 'Send'}
			</Button>
		</Box>
	);
};

const EmailButton: React.FC = () => {
	const email = 'trais.diedrich@gmail.com';

	const [info, setInfo] = React.useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setInfo(true);
		} catch (error) {
			console.error('Failed to copy to clipboard', error);
		}
	};

	const onClick = () => {
		void handleCopy();
	};

	return (
		<>
			<Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 1 }}>
				<IconButton color='secondary' onClick={onClick}>
					<Email sx={{ fontSize: '5.0rem' }} />
				</IconButton>
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={info}
				onClose={() => {
					setInfo(false);
				}}
				autoHideDuration={4000}
				message={
					<Typography variant='body1' align='center'>
						Email copied to clipboard
					</Typography>
				}
			/>
		</>
	);
};

export const Contact: React.FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Box
			id='contact'
			sx={{
				height: matches ? '100vh' : '140vh',
				minWidth: '100%',
				bgcolor: 'secondary.main',
				display: 'flex',
				flexDirection: matches ? 'row' : 'column',
				p: 5,
			}}>
			{/* TODO: This section looks a little stale for my taste */}
			<Box
				sx={{
					minWidth: matches ? '50%' : '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1.5rem',
					mt: matches ? 0 : 5,
				}}>
				<Typography variant='h3' align='center'>
					Let's Get in Touch
				</Typography>
				<Typography variant='h6' align='center' color='rgba(17, 17, 17, .6)'>
					You can connect with me at the following platforms
				</Typography>
				<Box
					sx={{
						width: '70%',
						height: '30%',
						display: 'flex',
						justifyContent: 'space-evenly',
						gap: '2rem',
						alignItems: 'center',
					}}>
					<Box
						component='a'
						href='https://www.linkedin.com/in/traison-diedrich-b9451a241'
						target='_blank'
						sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 1 }}>
						<IconButton color='secondary'>
							<LinkedIn sx={{ fontSize: '5.0rem' }} />
						</IconButton>
					</Box>
					<Box
						component='a'
						href='https://www.instagram.com/traiiison/'
						target='_blank'
						sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 1 }}>
						<IconButton color='secondary'>
							<Instagram sx={{ fontSize: '5.0rem' }} />
						</IconButton>
					</Box>
					<EmailButton />
				</Box>
				<Typography variant='h6' align='center' color='rgba(17, 17, 17, .6)'>
					Or feel free to send me a message here
				</Typography>
				<a
					href='#contact-form'
					style={{ pointerEvents: matches ? 'none' : 'auto' }}>
					<IconButton disabled={matches} color='primary'>
						<ArrowForwardIos
							sx={{
								fontSize: '4.0rem',
								transform: `rotate(${matches ? 0 : 90}deg)`,
							}}
						/>
					</IconButton>
				</a>
			</Box>
			<Box
				id='contact-form'
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					mt: matches ? 0 : 5,
					ml: matches ? 5 : 0,
				}}>
				<Player
					src={airplaneAnimation}
					className='player'
					loop
					autoplay
					speed={0.3}
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
						color='text.primary'
						align='center'
						sx={{ mb: 2 }}>
						Contact Me
					</Typography>
					<Typography variant='body1' color='text.secondary' align='center'>
						I usually respond within 24-48 hours
					</Typography>
					<ContactForm />
				</Box>
			</Box>
		</Box>
	);
};
