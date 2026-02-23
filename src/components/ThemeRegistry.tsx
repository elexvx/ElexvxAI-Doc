import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
    lightTheme,
    darkTheme,
    getInitialMode,
    applyThemeClass,
    subscribeThemeMode,
} from '../theme/theme';
import type { ThemeMode } from '../theme/theme';

export default function ThemeRegistry() {
    const [mode, setMode] = useState<ThemeMode>(getInitialMode);

    // Keep <html> class in sync whenever mode changes
    useEffect(() => {
        applyThemeClass(mode);
    }, [mode]);

    // Sync with global theme changes
    useEffect(() => {
        return subscribeThemeMode(setMode);
    }, []);

    const theme = useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        </ThemeProvider>
    );
}
