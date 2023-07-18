import { Box, Button, Divider, Fade, Grow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import Typewriter from 'typewriter-effect';
import profilePic from '../assets/profCutout.png';

// TODO: this very quickly became spaghetti code
// can consolidate the two button boxes together and
// consider using styled components to preserve more
// readable architecture ... also pretty sure using
// typewriter as a controller for animations is not best practice

const Intro: React.FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const [showSubtitle, setShowSubtitle] = React.useState(false);
	const [showButtons, setShowButtons] = React.useState(false);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				// this height needs to take account the app header on pageload
				height: '94vh',
				minWidth: '100%',
				position: 'relative',
			}}>
			<Box
				sx={{
					height: 7 / 11,
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: matches ? 'flex-start' : 'center',
					zIndex: 999,
					textAlign: matches ? 'left' : 'center',
					pl: matches ? 10 : 5,
					pr: matches ? '60vw' : 5,
					pt: matches ? '10vh' : 0,
					pb: 10,
				}}>
				<div className='text title'>
					<Typewriter
						options={{ delay: 60 }}
						onInit={(typewriter) => {
							typewriter
								.pauseFor(500)
								.typeString('Hey!')
								.pauseFor(1000)
								.deleteAll()
								.typeString("I'm Traison")
								.pauseFor(300)
								.callFunction(() => {
									setShowSubtitle(true);
								})
								.pauseFor(1000)
								.callFunction(() => {
									setShowButtons(true);
								})
								.start();
						}}
					/>
				</div>
				<Fade in={showSubtitle} timeout={1500}>
					<p className='text subtitle'>
						A <strong>Fullstack Developer </strong>
						with a passion for <strong>Fitness </strong>
						and innovative <strong>Software Solutions</strong>
					</p>
				</Fade>
				{!matches && (
					<Box sx={{ display: 'flex', mt: 7 }}>
						<Grow in={showButtons} style={{ transformOrigin: '0 0 0' }}>
							<Button
								variant='contained'
								color='secondary'
								sx={{
									mr: 3,
								}}>
								about me
							</Button>
						</Grow>
						<Grow
							in={showButtons}
							style={{ transformOrigin: '0 0 0' }}
							{...(showButtons ? { timeout: 1000 } : {})}>
							<Button
								variant='contained'
								color='secondary'
								sx={{
									mr: 3,
								}}>
								my work
							</Button>
						</Grow>
						<Grow
							in={showButtons}
							style={{ transformOrigin: '0 0 0' }}
							{...(showButtons ? { timeout: 2000 } : {})}>
							<Button variant='contained' color='secondary'>
								Contact
							</Button>
						</Grow>
					</Box>
				)}
			</Box>
			<Box
				sx={{
					height: 4 / 11,
					bgcolor: 'text.primary',
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{matches && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '25%',
							mr: '55%',
							mb: 4,
						}}>
						<Grow in={showButtons} style={{ transformOrigin: '0 0 0' }}>
							<Button
								variant='contained'
								sx={{
									mb: 3,
									py: 1,
								}}>
								about me
							</Button>
						</Grow>
						<Grow
							in={showButtons}
							style={{ transformOrigin: '0 0 0' }}
							{...(showButtons ? { timeout: 1000 } : {})}>
							<Button variant='contained' sx={{ mb: 3, py: 1 }}>
								my work
							</Button>
						</Grow>
						<Grow
							in={showButtons}
							style={{ transformOrigin: '0 0 0' }}
							{...(showButtons ? { timeout: 2000 } : {})}>
							<Button variant='contained' sx={{ py: 1 }}>
								Contact
							</Button>
						</Grow>
					</Box>
				)}
				<Divider
					textAlign='center'
					variant='middle'
					sx={{
						mb: 2,
						width: '90%',
						zIndex: 11,
						borderBottomWidth: '1px',
						borderBottomColor: 'background.default',
						position: 'absolute',
						bottom: 5,
					}}></Divider>
			</Box>
			<img
				src={profilePic}
				alt='Profile Picture'
				style={{
					position: 'absolute',
					maxHeight: matches ? '95%' : '60%',
					width: matches ? '80%' : '100%',
					objectFit: 'contain',
					zIndex: 10,
					bottom: 0,
					right: 0,
				}}
			/>
		</Box>
	);
};

export default Intro;
