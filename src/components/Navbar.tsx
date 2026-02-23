import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider
} from '@mui/material';
import {
    lightTheme,
    darkTheme,
    getInitialMode,
    setThemeMode,
    subscribeThemeMode
} from '../theme/theme';
import type { ThemeMode } from '../theme/theme';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ScienceIcon from '@mui/icons-material/Science';
import TranslateIcon from '@mui/icons-material/Translate';
import GitHubIcon from '@mui/icons-material/GitHub';

interface NavLink {
    label: string;
    path: string;
}

interface NavbarProps {
    data: {
        logo: string;
        links: NavLink[];
    };
}

export default function Navbar({ data }: NavbarProps) {
    const [mode, setMode] = useState<ThemeMode>(getInitialMode);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        return subscribeThemeMode(setMode);
    }, []);

    const toggleColorMode = () => {
        const next = mode === 'light' ? 'dark' : 'light';
        setMode(next);
        setThemeMode(next);
    };

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>{data.logo}</Typography>
            <List>
                {data.links.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component="a" href={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const theme = React.useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <Box sx={{ bgcolor: '#0061A4', color: 'white', borderRadius: 1.5, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                                <ScienceIcon fontSize="small" />
                            </Box>
                            <Typography variant="h6" component="a" href="/" sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, fontSize: '1.1rem' }}>
                                {data.logo}
                            </Typography>
                            <Typography sx={{ mx: 2, color: 'divider' }}>|</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>ElexvxAI 创新产业研发中心</Typography>
                        </Box>
                    </Box>

                    {/* Desktop Nav Links */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                        {data.links.map((item) => (
                            <Button key={item.label} component="a" href={item.path} color="inherit" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.95rem', '&:hover': { bgcolor: 'transparent', color: 'primary.main' } }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Right side Icons */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flex: 1, justifyContent: 'flex-end', gap: 1 }}>
                        <IconButton color="inherit" size="small">
                            <TranslateIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        </IconButton>
                        <IconButton color="inherit" size="small" component="a" href="https://github.com/elexvx" target="_blank">
                            <GitHubIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        </IconButton>
                        <IconButton onClick={toggleColorMode} color="inherit" size="small">
                            {mode === 'dark'
                                ? <LightModeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                : <DarkModeIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                        </IconButton>
                    </Box>

                    {/* Mobile Theme Toggle */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Box component="nav">
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}>
                    {drawer}
                </Drawer>
            </Box>

            <Toolbar />
        </ThemeProvider>
    );
}
