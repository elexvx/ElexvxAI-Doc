import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'themeMode';
export const THEME_CHANGE_EVENT = 'theme-change';

const getDesignTokens = (mode: 'light' | 'dark') => ({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9',
        },
        secondary: {
            main: mode === 'light' ? '#9c27b0' : '#ce93d8',
        },
        background: {
            default: mode === 'light' ? '#f8f9fa' : '#0a1929',
            paper: mode === 'light' ? '#ffffff' : '#001e3c',
        },
        text: {
            primary: mode === 'light' ? '#1c2025' : '#f3f6f9',
            secondary: mode === 'light' ? '#5f6973' : '#aab4be',
        },
        divider: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
        action: {
            hover: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
            selected: mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.16)',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none' as const,
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: mode === 'light'
                        ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                        : '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(10, 25, 41, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: mode === 'light' ? '#1c2025' : '#f3f6f9',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${mode === 'light' ? '#e0e3e7' : '#1e4976'}`,
                },
            },
        },
    },
});

export const lightTheme = responsiveFontSizes(createTheme(getDesignTokens('light')));
export const darkTheme = responsiveFontSizes(createTheme(getDesignTokens('dark')));

function isThemeMode(mode: unknown): mode is ThemeMode {
    return mode === 'light' || mode === 'dark';
}

function getSavedMode(): ThemeMode | null {
    if (typeof window === 'undefined') return null;
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        return isThemeMode(saved) ? saved : null;
    } catch {
        return null;
    }
}

/**
 * Determines the initial colour mode.
 * Priority: localStorage → <html> class (set by inline script) → prefers-color-scheme → 'light'
 */
export function getInitialMode(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    const saved = getSavedMode();
    if (saved) return saved;
    // The inline <script> in Layout.astro already set html.dark before React runs
    if (document.documentElement.classList.contains('dark')) return 'dark';
    if (document.documentElement.dataset.theme === 'dark') return 'dark';
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

/**
 * Synchronise the `dark` CSS class on <html> AND update `color-scheme` so
 * native browser controls (scrollbars, inputs) match.
 */
export function applyThemeClass(mode: ThemeMode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (mode === 'dark') {
        root.classList.add('dark');
        root.dataset.theme = 'dark';
        root.style.colorScheme = 'dark';
        root.style.backgroundColor = '#0a1929';
        root.style.color = '#f3f6f9';
    } else {
        root.classList.remove('dark');
        root.dataset.theme = 'light';
        root.style.colorScheme = 'light';
        root.style.backgroundColor = '#f8f9fa';
        root.style.color = '#1c2025';
    }
}

export function subscribeThemeMode(onModeChange: (mode: ThemeMode) => void) {
    if (typeof window === 'undefined') return () => {};

    const handleThemeChange = (event: Event) => {
        const mode = (event as CustomEvent<ThemeMode>).detail;
        if (isThemeMode(mode)) onModeChange(mode);
    };

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key !== THEME_STORAGE_KEY || !isThemeMode(event.newValue)) return;
        onModeChange(event.newValue);
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
        window.removeEventListener('storage', handleStorageChange);
    };
}

export function setThemeMode(mode: ThemeMode) {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
        // Ignore localStorage errors
    }

    applyThemeClass(mode);
    window.dispatchEvent(new CustomEvent<ThemeMode>(THEME_CHANGE_EVENT, { detail: mode }));
}
