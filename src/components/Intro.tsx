import { Box, Button, Divider, Fade, Grow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import Typewriter from 'typewriter-effect';
import profilePic from '../assets/profCutout.png';

// interface IntroProps {}

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
				}}></Box>
			<Box
				sx={{
					height: 4 / 11,
					bgcolor: 'text.primary',
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}>
				<Divider
					textAlign='center'
					variant='middle'
					sx={{
						mb: 2,
						width: '95%',
						zIndex: 11,
						borderBottomWidth: '1px',
						borderBottomColor: 'background.default',
					}}></Divider>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					width: matches ? '30%' : '70%',
					zIndex: 999,
					top: matches ? '25%' : '8%',
					left: matches ? '7%' : '15%',
					textAlign: matches ? 'left' : 'center',
				}}>
				<div className='text title'>
					<Typewriter
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
					<Box sx={{ display: 'flex', mt: 5 }}>
						<Grow in={showButtons} style={{ transformOrigin: '0 0 0' }}>
							<Button
								variant='contained'
								sx={{
									bgcolor: 'text.primary',
									color: 'background.default',
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
								sx={{
									bgcolor: 'text.primary',
									color: 'background.default',
									mr: 3,
								}}>
								my work
							</Button>
						</Grow>
						<Grow
							in={showButtons}
							style={{ transformOrigin: '0 0 0' }}
							{...(showButtons ? { timeout: 2000 } : {})}>
							<Button
								variant='contained'
								sx={{ bgcolor: 'text.primary', color: 'background.default' }}>
								Contact
							</Button>
						</Grow>
					</Box>
				)}
			</Box>
			{matches && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						position: 'absolute',
						width: '30%',
						left: '8%',
						bottom: '8%',
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
