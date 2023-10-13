import { Close } from '@mui/icons-material';
import ConstructionIcon from '@mui/icons-material/Construction';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import Masonry from 'react-masonry-css';

import { Box, BoxProps, Button, IconButton, Typography } from '@mui/material';
import * as React from 'react';

import { useBreakpoint } from '../BreakpointProvider';

interface SkillCardProps extends BoxProps {
	title: string;
	Icon: React.ElementType;
	skills: string[];
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
}

// This card hover effect is a mess and a half,
// don't ever do it again or at least speak to a
// professional first lmao
const SkillCard: React.FC<SkillCardProps> = ({
	title,
	Icon,
	skills,
	expanded,
	setExpanded,
	...props
}) => {
	const breakpoint = useBreakpoint();
	const cardRef = React.useRef<HTMLElement | null>(null);

	React.useEffect(() => {
		const adjustCardWidth = () => {
			if (cardRef.current && !expanded) {
				const parentHeight = cardRef.current.parentElement?.clientHeight;
				const height = 0.33 * parentHeight!;
				const parentWidth = cardRef.current.parentElement?.clientWidth;
				const calcWidth = 1.25 * height;
				const width = calcWidth > parentWidth! ? parentWidth! : calcWidth;
				cardRef.current.style.width = `${width}px`;
			} else if (cardRef.current) {
				cardRef.current.style.width = '100%';
			}
		};

		adjustCardWidth(); // Initial effect

		window.addEventListener('resize', adjustCardWidth); // Add resize event listener

		return () => {
			window.removeEventListener('resize', adjustCardWidth); // Clean up event listener
		};
	}, [expanded]);

	return (
		<Box
			{...props}
			ref={cardRef}
			style={{
				height: expanded ? '100%' : '33%',
				width: '100%',
				maxWidth: '600px',
				position: 'absolute',
				top: expanded ? 0 : '',
				left: '50%',
				transform: 'translateX(-50%)',
				transition: 'all 0.9s ease',
				zIndex: expanded ? 2 : 1,
				paddingTop: '4rem',
				overflow: 'hidden',
			}}>
			<Box
				onClick={!expanded ? () => setExpanded(true) : undefined}
				sx={{
					cursor: expanded ? '' : 'pointer',
					width: '100%',
					height: '100%',
					bgcolor: 'secondary.main',
					display: 'grid',
					placeItems: 'center',
					transition: 'all 0.9s ease',
					borderRadius: '5px',
					position: 'relative',
				}}>
				<Box
					sx={{
						height: '25%',
						aspectRatio: 1,
						position: 'absolute',
						top: expanded ? '5%' : '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						transition: 'top 0.9s ease',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						bgcolor: 'secondary.main',
						borderRadius: '50%',
					}}>
					<Icon
						sx={{
							fontSize: '4rem',
						}}
					/>
					<Typography variant='h5' align='center' whiteSpace='nowrap'>
						{title}
					</Typography>
				</Box>
				<IconButton
					sx={{
						position: 'absolute',
						top: '.5rem',
						right: '.5rem',
						opacity: expanded ? 1 : 0,
						transition: 'opacity 0.9s ease',
						color: 'background.default',
					}}
					disabled={!expanded}
					onClick={(event) => {
						event.stopPropagation();
						setExpanded(false);
					}}>
					<Close />
				</IconButton>
				<Box
					sx={{
						position: 'absolute',
						top: '18%',
						left: 0,
						width: expanded ? '100%' : 0,
						height: '8px',
						bgcolor: 'background.default',
						transition: expanded ? 'width 1.4s ease-in' : '',
					}}
				/>
				<Box
					sx={{
						height: '80%',
						width: '100%',
						position: 'absolute',
						top: expanded ? '60%' : '100%',
						left: '50%',
						transform: expanded
							? 'translate(-50%, -50%)'
							: 'translate(-50%, 0)',
						transition: 'all 0.9s ease',
						display: 'flex',
						justifyContent: 'center',
						p: breakpoint === 'mobile' ? 1 : 4,
					}}>
					<Masonry
						breakpointCols={breakpoint === 'mobile' ? 2 : 3}
						className='masonry-grid'
						columnClassName='masonry-column'>
						{skills.map((skill, index) => {
							const randomHeight =
								breakpoint === 'mobile'
									? Math.floor(Math.random() * 2) + 2
									: Math.floor(Math.random() * 4) + 3;
							return (
								<Box
									key={index}
									sx={{
										display: 'grid',
										placeItems: 'center',
										bgcolor: 'background.default',
										borderRadius: '1rem',
										mb: '1rem',
										px: 1,
										py: randomHeight,
									}}>
									<Typography align='center' sx={{ color: 'text.primary' }}>
										{skill}
									</Typography>
								</Box>
							);
						})}
					</Masonry>
				</Box>
			</Box>
		</Box>
	);
};

export const Professional: React.FC<BoxProps> = ({ ...props }) => {
	const [expandedStates, setExpandedStates] = React.useState([
		false,
		false,
		false,
	]);

	const anyExpanded = expandedStates.some((expanded) => expanded);

	const handleExpansion = (index: number, expanded: boolean) => {
		setExpandedStates((prevExpandedStates) => {
			const newExpandedStates = [...prevExpandedStates];
			newExpandedStates[index] = expanded;
			return newExpandedStates;
		});
	};

	const FrontendCardProps: SkillCardProps = {
		title: 'Frontend',
		Icon: WebIcon,
		skills: [
			'Tailwind CSS',
			'JavaScript',
			'TypeScript',
			'React.js',
			'Material-UI',
			'Daisy UI',
			'PHP',
			'Bootstrap',
			'UI/UX Design',
		],
		expanded: expandedStates[0],
		setExpanded: (expanded) => handleExpansion(0, expanded),
		sx: {
			top: 0,
		},
	};

	const BackendCardProps: SkillCardProps = {
		title: 'Backend',
		Icon: StorageIcon,
		skills: [
			'MySQL',
			'PostgreSQL',
			'FastAPI',
			'Linode Cloud Computing',
			'Traefik',
			'Supabase',
			'Python',
			'NumPy',
		],
		expanded: expandedStates[1],
		setExpanded: (expanded) => handleExpansion(1, expanded),
		sx: {
			top: '33%',
		},
	};

	const OtherCardProps: SkillCardProps = {
		title: 'Other',
		Icon: ConstructionIcon,
		skills: [
			'Docker',
			'Git',
			'Agile',
			'Scrum',
			'Markdown',
			'Asciidoctor',
			'Java',
			'C/C++',
			'CI/CD',
			'OpenCV',
		],
		expanded: expandedStates[2],
		setExpanded: (expanded) => handleExpansion(2, expanded),
		sx: {
			top: '66%',
		},
	};

	return (
		<Box
			id='right'
			{...props}
			style={{
				height: '100%',
				width: '100%',
				overflow: 'hidden',
				position: 'absolute',
			}}>
			<Box
				sx={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'relative',
					pt: 3,
					pb: anyExpanded ? 0 : 6,
					transition: 'padding 0.9s ease',
				}}>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						display: 'grid',
						placeItems: 'center',
						gap: '.5rem',
						width: '100%',
						opacity: anyExpanded ? 0 : 1,
						transition: 'opacity 0.9s ease',
					}}>
					<Typography
						variant='h4'
						align='center'
						sx={{ color: 'text.primary' }}>
						As a Developer
					</Typography>
					<Typography
						variant='subtitle1'
						align='center'
						sx={{ color: 'text.secondary' }}>
						My skills and experience
					</Typography>
				</Box>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						position: 'relative',
					}}>
					<SkillCard {...FrontendCardProps} />
					<SkillCard {...BackendCardProps} />
					<SkillCard {...OtherCardProps} />
				</Box>
				<Box
					component='a'
					href='//traison-diedrich.github.io/resume/'
					target='_blank'
					sx={{
						position: 'absolute',
						width: '100%',
						maxWidth: '600px',
						bottom: '0',
						display: 'grid',
						placeItems: 'center',
						textDecoration: 'none',
					}}>
					<Button color='secondary' variant='contained'>
						View Resume
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
