import { useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

type BreakpointValues = 'mobile' | 'small' | 'large';

const BreakpointContext = React.createContext<BreakpointValues>('large');

export const BreakpointProvider: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isLarge = useMediaQuery(theme.breakpoints.up('md'));

	const value = isMobile ? 'mobile' : isLarge ? 'large' : 'small';

	return (
		<BreakpointContext.Provider value={value}>
			{children}
		</BreakpointContext.Provider>
	);
};

export const useBreakpoint = (): BreakpointValues => {
	const context = React.useContext(BreakpointContext);
	if (!context) {
		throw new Error('useBreakpoint must be used within a BreakpointProvider');
	}
	return context;
};
