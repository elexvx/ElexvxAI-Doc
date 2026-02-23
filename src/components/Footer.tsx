import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Stack, IconButton } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import { withTheme } from '../theme/withTheme';
import XIcon from '@mui/icons-material/X'; // Replaces Twitter
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface FooterLink {
    label: string;
    url: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

interface FooterProps {
    data: {
        logoText: string;
        description: string;
        columns: FooterColumn[];
        copyright: string;
    };
}

const Footer = ({ data }: FooterProps) => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: (theme) => theme.palette.mode === 'light' ? '#f4f3f6' : 'background.paper',
                pt: 8,
                pb: 4,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {/* Logo and Description */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ScienceIcon sx={{ mr: 1, color: 'text.primary' }} />
                            <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {data.logoText}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
                            {data.description}
                        </Typography>
                    </Grid>

                    {/* Link Columns */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={4}>
                            {data.columns.map((col, index) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={index}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                                        {col.title}
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {col.links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                color="text.secondary"
                                                underline="none"
                                                variant="body2"
                                                sx={{ '&:hover': { color: 'primary.main' } }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 3 }} />

                {/* Bottom Area */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {data.copyright}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="inherit" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                            <XIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="inherit" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                            <LinkedInIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default withTheme(Footer);
