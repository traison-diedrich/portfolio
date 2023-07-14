import { Box } from '@mui/material';
import * as React from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import profilePic from '../assets/profilePic.jpeg';

// interface IntroProps {}

export const Intro: React.FC = () => {
	return (
		<Box
			sx={{
				height: '70vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box display='flex' flexDirection='column' justifyContent='center'>
				<Typewriter
					options={{
						wrapperClassName: 'title',
					}}
					onInit={(typewriter) => {
						typewriter
							.typeString('Hey!')
							.pauseFor(1000)
							.deleteAll()
							.typeString("I'm Traison")
							.start();
					}}
				/>
				<Typewriter
					options={{
						wrapperClassName: 'subtitle',
					}}
					onInit={(typewriter) => {
						typewriter
							.typeString(
								'A <strong>Fullstack Developer</strong> with a passion for <strong>Fitness</strong> and elegant software solutions'
							)
							.start();
					}}
				/>
			</Box>
			<img
				src={profilePic}
				alt='Profile Picture'
				style={{ width: '200px', height: 'auto', borderRadius: '25%' }}
			/>
		</Box>
	);
};
