import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme, getInitialMode, subscribeThemeMode } from './theme';
import type { ThemeMode } from './theme';

export function withTheme<P extends object>(Component: React.ComponentType<P>) {
    return function ThemedComponent(props: P) {
        const [mode, setMode] = useState<ThemeMode>(getInitialMode);

        useEffect(() => {
            return subscribeThemeMode(setMode);
        }, []);

        const theme = useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

        return (
            <ThemeProvider theme={theme}>
                <Component {...props} />
            </ThemeProvider>
        );
    };
}
