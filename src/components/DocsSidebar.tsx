import React, { useState } from 'react';
import {
    Box, Drawer, List, ListItemButton, ListItemText, ListItemIcon, IconButton, Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import { useTheme } from '@mui/material/styles';
import { withTheme } from '../theme/withTheme';

const drawerWidth = 260;

const iconMap: Record<string, React.ReactElement> = {
    HomeOutlined: <HomeOutlinedIcon fontSize="small" />,
    Download: <DownloadIcon fontSize="small" />,
    RocketLaunchOutlined: <RocketLaunchOutlinedIcon fontSize="small" />,
    LayersOutlined: <LayersOutlinedIcon fontSize="small" />,
    PsychologyOutlined: <PsychologyOutlinedIcon fontSize="small" />,
    SchemaOutlined: <SchemaOutlinedIcon fontSize="small" />,
    CodeOutlined: <CodeOutlinedIcon fontSize="small" />,
    TerminalOutlined: <TerminalOutlinedIcon fontSize="small" />
};

interface NavItem {
    label: string;
    path: string;
    icon?: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

interface DocsSidebarProps {
    data: NavSection[];
    currentPath: string;
}

function DocsSidebar({ data, currentPath }: DocsSidebarProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const [mobileOpen, setMobileOpen] = useState(false);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const state: Record<string, boolean> = {};
        data.forEach((section) => { state[section.title] = true; });
        return state;
    });

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const toggleSection = (title: string) => setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

    const drawerContent = (
        <Box sx={{ overflow: 'auto', mt: { xs: 2, md: 2 }, pb: 8, px: 2 }}>
            <List component="nav" sx={{ width: '100%' }}>
                {data.map((section) => (
                    <React.Fragment key={section.title}>
                        <ListItemButton
                            onClick={() => toggleSection(section.title)}
                            sx={{ py: 1, px: 1, borderRadius: 2, '&:hover': { bgcolor: 'transparent' } }}
                        >
                            <ListItemText
                                primary={section.title}
                                primaryTypographyProps={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.85rem' }}
                            />
                        </ListItemButton>
                        <Collapse in={openSections[section.title]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {section.items.map((item) => {
                                    const isActive = currentPath === item.path || currentPath === item.path + '/';
                                    return (
                                        <ListItemButton
                                            key={item.path}
                                            component="a"
                                            href={item.path}
                                            selected={isActive}
                                            sx={{
                                                pl: 1, py: 0.75, mb: 0.5,
                                                borderRadius: 4,
                                                minHeight: 36,
                                                color: isActive
                                                    ? (isDark ? '#d6c8db' : 'primary.main')
                                                    : 'text.secondary',
                                                '&.Mui-selected': {
                                                    bgcolor: isDark ? 'rgba(141, 107, 148, 0.15)' : 'rgba(0, 97, 164, 0.08)',
                                                    '&:hover': {
                                                        bgcolor: isDark ? 'rgba(141, 107, 148, 0.25)' : 'rgba(0, 97, 164, 0.12)',
                                                    }
                                                },
                                                '&:hover': {
                                                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'action.hover',
                                                },
                                            }}
                                        >
                                            {item.icon && iconMap[item.icon] && (
                                                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                                                    {iconMap[item.icon]}
                                                </ListItemIcon>
                                            )}
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: isActive ? 500 : 400,
                                                    color: 'inherit'
                                                }}
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, position: 'fixed', bottom: 24, right: 24, bgcolor: 'primary.main', color: 'white', boxShadow: 3, zIndex: 1000, '&:hover': { bgcolor: 'primary.dark' } }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.default', borderRight: '1px solid', borderColor: 'divider' } }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'fixed', top: 64, height: 'calc(100% - 64px)', borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.default', zIndex: 1 } }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}

export default withTheme(DocsSidebar);
