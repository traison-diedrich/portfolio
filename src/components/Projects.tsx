import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import * as React from 'react';

export const Projects: React.FC = () => {
	return (
		<Box sx={{ p: 5 }}>
			<Grid container spacing={2} direction='row' justifyContent='center'>
				<Grid item>
					<Card sx={{ width: '300px' }}>
						<CardHeader title='Card Title' />
						<CardContent>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
							veniam rerum eum molestiae in. Cumque natus ad, eveniet possimus
							velit aut autem nostrum consequatur perspiciatis architecto
							repudiandae mollitia, inventore sed!
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card sx={{ width: '300px' }}>
						<CardHeader title='Card Title' />
						<CardContent>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
							veniam rerum eum molestiae in. Cumque natus ad, eveniet possimus
							velit aut autem nostrum consequatur perspiciatis architecto
							repudiandae mollitia, inventore sed!
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card sx={{ width: '300px' }}>
						<CardHeader title='Card Title' />
						<CardContent>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
							veniam rerum eum molestiae in. Cumque natus ad, eveniet possimus
							velit aut autem nostrum consequatur perspiciatis architecto
							repudiandae mollitia, inventore sed!
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};
