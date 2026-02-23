import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTheme } from '@mui/material/styles';
import { withTheme } from '../theme/withTheme';

const tocWidth = 240;

interface TocItem {
    id: string;
    label: string;
    level: number; // 1 = h1, 2 = h2, 3 = h3
}

function DocsToc() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // --- Build TOC from actual page headings ---
    useEffect(() => {
        // Wait a tick so the page content is fully rendered
        const buildToc = () => {
            const article = document.querySelector('main article, main .doc-content, main');
            if (!article) return;

            const headings = Array.from(
                article.querySelectorAll('h1, h2, h3')
            ) as HTMLElement[];

            const tocItems: TocItem[] = headings.map((heading, i) => {
                // Ensure each heading has an id for anchor linking
                if (!heading.id) {
                    heading.id = heading.textContent
                        ?.toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '') ?? `heading-${i}`;
                }
                return {
                    id: heading.id,
                    label: heading.textContent ?? '',
                    level: parseInt(heading.tagName.slice(1), 10),
                };
            });

            setItems(tocItems);
            if (tocItems.length > 0) setActiveId(tocItems[0].id);
        };

        // Small delay to ensure content is rendered
        const timer = setTimeout(buildToc, 100);
        return () => clearTimeout(timer);
    }, []);

    // --- Highlight active section on scroll ---
    useEffect(() => {
        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find topmost visible heading
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-64px 0px -70% 0px', threshold: 0 }
        );

        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    const handleClick = (id: string) => {
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Box
            component="nav"
            sx={{
                width: tocWidth,
                flexShrink: 0,
                display: { xs: 'none', lg: 'block' },
                position: 'sticky',
                top: 88,
                height: 'calc(100vh - 88px)',
                overflowY: 'auto',
                pt: 1,
                px: 2,
            }}
        >
            {items.length > 0 && (
                <>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 2, pl: 1 }}>
                        On this page
                    </Typography>

                    <List disablePadding sx={{ mb: 4 }}>
                        {items.map((item) => {
                            const isActive = item.id === activeId;
                            const isSubheading = item.level >= 3;
                            return (
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => handleClick(item.id)}
                                    selected={isActive}
                                    sx={{
                                        py: 0.5,
                                        pl: isSubheading ? 3 : 1,
                                        minHeight: 32,
                                        borderRadius: 2,
                                        mb: 0.25,
                                        color: isActive
                                            ? (isDark ? '#90caf9' : 'primary.main')
                                            : 'text.secondary',
                                        '&.Mui-selected': {
                                            bgcolor: isDark
                                                ? 'rgba(144, 202, 249, 0.1)'
                                                : 'rgba(25, 118, 210, 0.08)',
                                            '&:hover': {
                                                bgcolor: isDark
                                                    ? 'rgba(144, 202, 249, 0.16)'
                                                    : 'rgba(25, 118, 210, 0.12)',
                                            },
                                        },
                                        '&:hover': {
                                            bgcolor: isDark
                                                ? 'rgba(255, 255, 255, 0.05)'
                                                : 'action.hover',
                                            color: 'text.primary',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontSize: isSubheading ? '0.8rem' : '0.85rem',
                                            fontWeight: isActive ? 600 : 400,
                                            noWrap: true,
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </>
            )}

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 2, pl: 1 }}>
                Community
            </Typography>
            <List disablePadding>
                {[
                    { icon: <ChatBubbleOutlineIcon fontSize="small" />, label: 'Discussions', href: 'https://github.com/elexvx' },
                    { icon: <BugReportOutlinedIcon fontSize="small" />, label: 'Report an issue', href: 'https://github.com/elexvx/issues' },
                    { icon: <EditOutlinedIcon fontSize="small" />, label: 'Edit this page', href: '#' },
                ].map(({ icon, label, href }) => (
                    <ListItemButton
                        key={label}
                        component="a"
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        sx={{
                            py: 0.5,
                            pl: 1,
                            borderRadius: 2,
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'text.primary',
                                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'action.hover',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>{icon}</ListItemIcon>
                        <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.85rem' }} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

export default withTheme(DocsToc);
