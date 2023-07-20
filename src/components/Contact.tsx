import ChatIcon from '@mui/icons-material/Chat';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';

const ContactForm: React.FC = () => {
	return (
		<Box
			component='form'
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}>
			<TextField
				color='secondary'
				variant='outlined'
				placeholder='Name'
				fullWidth
			/>
			<TextField
				color='secondary'
				variant='outlined'
				placeholder='Email'
				fullWidth
			/>
			<TextField
				color='secondary'
				variant='outlined'
				placeholder='Message'
				fullWidth
			/>
		</Box>
	);
};

export const Contact: React.FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: matches ? 'row' : 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minWidth: '100%',
				height: matches ? '100vh' : '150vh',
				bgcolor: 'secondary.main',
				p: 3,
			}}>
			<Box
				sx={{
					minWidth: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
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
					height: '100%',
					minWidth: '100%',
					bgcolor: 'background.default',
					borderRadius: '5px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignContent: 'center',
					p: 5,
				}}>
				<Box display='flex' alignItems='center'>
					<Typography variant='h3' color='secondary' align='left' width='50%'>
						Contact Me
					</Typography>
					<ConnectWithoutContactIcon
						color='secondary'
						sx={{ fontSize: '6.0rem', marginLeft: 'auto' }}
					/>
				</Box>
				<ContactForm />
			</Box>
		</Box>
	);
};
