import { Box, Button, Divider, Fade, Grow } from '@mui/material';
import * as React from 'react';
import Typewriter from 'typewriter-effect';
import { useBreakpoint } from '../BreakpointProvider';
import images from '../assets/images';

// TODO: this very quickly became spaghetti code
// can consolidate the two button boxes together and
// consider using styled components to preserve more
// readable architecture ... also pretty sure using
// typewriter as a controller for animations is not best practice

// TODO: a background animation for the top black box here
// would be eye catching

export const Intro: React.FC = () => {
	const breakpoint = useBreakpoint();

	const [showSubtitle, setShowSubtitle] = React.useState(false);
	const [showButtons, setShowButtons] = React.useState(false);

	return (
		<Box
			id='intro'
			className='scroll-target'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '94vh',
				minHeight: '615px',
				position: 'relative',
			}}>
			<Box
				sx={{
					height: 7 / 11,
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: breakpoint === 'large' ? 'flex-start' : 'center',
					zIndex: 999,
					textAlign: breakpoint === 'large' ? 'left' : 'center',
					pl: '10vw',
					pr: breakpoint === 'large' ? '60vw' : '10vw',
					pt: breakpoint === 'large' ? '20vh' : '100px',
					pb: breakpoint === 'large' ? '10vh' : '125px',
				}}>
				<div className='text title'>
					<Typewriter
						options={{ delay: 70 }}
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
								.pauseFor(2500)
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
				{breakpoint !== 'large' && (
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: '1rem',
							mt: 7,
						}}>
						<a href='#about'>
							<Grow in={showButtons} style={{ transformOrigin: '0 0 0' }}>
								<Button
									variant='contained'
									color='secondary'
									sx={{
										size: breakpoint === 'mobile' ? 'small' : '',
										width: '6rem',
									}}>
									about
								</Button>
							</Grow>
						</a>
						<a href='#projects'>
							<Grow
								in={showButtons}
								style={{ transformOrigin: '0 0 0' }}
								{...(showButtons ? { timeout: 1500 } : {})}>
								<Button
									variant='contained'
									color='secondary'
									sx={{
										size: breakpoint === 'mobile' ? 'small' : '',
										width: '6rem',
									}}>
									projects
								</Button>
							</Grow>
						</a>
						<a href='#contact'>
							<Grow
								in={showButtons}
								style={{ transformOrigin: '0 0 0' }}
								{...(showButtons ? { timeout: 3000 } : {})}>
								<Button
									variant='contained'
									color='secondary'
									sx={{
										size: breakpoint === 'mobile' ? 'small' : '',
										width: '6rem',
									}}>
									contact
								</Button>
							</Grow>
						</a>
					</Box>
				)}
			</Box>
			<Box
				sx={{
					height: 4 / 11,
					bgcolor: 'secondary.main',
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{breakpoint === 'large' && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '25%',
							mr: '55%',
							mb: 4,
							zIndex: 999,
						}}>
						<a href='#about'>
							<Grow in={showButtons} style={{ transformOrigin: '0 0 0' }}>
								<Button
									variant='contained'
									sx={{
										mb: 3,
										py: 1,
										width: '100%',
									}}>
									about me
								</Button>
							</Grow>
						</a>
						<a href='#projects'>
							<Grow
								in={showButtons}
								style={{ transformOrigin: '0 0 0' }}
								{...(showButtons ? { timeout: 1000 } : {})}>
								<Button
									variant='contained'
									sx={{ mb: 3, py: 1, width: '100%' }}>
									my work
								</Button>
							</Grow>
						</a>
						<a href='#contact'>
							<Grow
								in={showButtons}
								style={{ transformOrigin: '0 0 0' }}
								{...(showButtons ? { timeout: 2000 } : {})}>
								<Button variant='contained' sx={{ py: 1, width: '100%' }}>
									Contact
								</Button>
							</Grow>
						</a>
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
				src={images.profilePic}
				alt='Profile Picture'
				style={{
					position: 'absolute',
					maxHeight: breakpoint === 'large' ? '95%' : '60%',
					width: breakpoint === 'large' ? '80%' : '100%',
					objectFit: 'contain',
					zIndex: 10,
					bottom: 0,
					right: 0,
				}}
			/>
		</Box>
	);
};
