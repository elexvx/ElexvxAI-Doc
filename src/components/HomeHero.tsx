import React from 'react';
import { Box, Container, Typography, Button, Stack, Chip, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ScienceIcon from '@mui/icons-material/Science';
import { withTheme } from '../theme/withTheme';

interface HomeHeroProps {
    data: {
        chip: string;
        titleNormal: string;
        titleHighlight: string;
        subtitle: string;
        primaryButton: string;
        primaryLink: string;
        secondaryButton: string;
        secondaryLink: string;
        checkmarks: string[];
    };
}

const HomeHero = ({ data }: HomeHeroProps) => {
    return (
        <Box
            sx={{
                pt: { xs: 8, md: 12 },
                pb: { xs: 8, md: 12 },
                bgcolor: 'background.default',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">

                    {/* Left Text Content */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 4 }}>
                            <Chip
                                label={data.chip}
                                color="primary"
                                variant="outlined"
                                size="small"
                                sx={{ mb: 3, fontWeight: 600, bgcolor: 'rgba(25, 118, 210, 0.08)' }}
                            />
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    color: 'text.primary'
                                }}
                            >
                                {data.titleNormal}{' '}
                                <Box component="span" sx={{ color: '#0061A4' }}>
                                    {data.titleHighlight}
                                </Box>
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.6, fontWeight: 400, maxWidth: '90%' }}
                            >
                                {data.subtitle}
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    href={data.primaryLink}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ px: 4, py: 1.5, fontSize: '1.05rem', bgcolor: '#0061A4', '&:hover': { bgcolor: '#004a80' } }}
                                >
                                    {data.primaryButton}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    href={data.secondaryLink}
                                    startIcon={<ArticleOutlinedIcon />}
                                    sx={{ px: 4, py: 1.5, fontSize: '1.05rem', color: '#0061A4', borderColor: '#0061A4' }}
                                >
                                    {data.secondaryButton}
                                </Button>
                            </Stack>

                            {/* Checkmarks */}
                            <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                                {data.checkmarks.map((mark, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1, sm: 0 } }}>
                                        <CheckCircleOutlineIcon sx={{ color: '#0061A4', fontSize: '1.2rem' }} />
                                        <Typography variant="body2" fontWeight={600} color="text.primary">
                                            {mark}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Right Graphic Content (Placeholder for complex abstract 3D art) */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', width: '100%', pt: '75%' /* 4:3 aspect */ }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: 4,
                                    bgcolor: '#f3e5f5',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)'
                                }}
                            >
                                {/* Abstract representation of network/model */}
                                <Box sx={{ width: '60%', height: '50%', border: '2px solid rgba(0,97,164, 0.2)', borderRadius: '50%', borderBlockStyle: 'dashed', position: 'absolute', animation: 'spin 20s linear infinite' }} />
                                <Box sx={{ width: '40%', height: '30%', border: '2px solid rgba(0,97,164, 0.5)', borderRadius: '50%', borderInlineStyle: 'dotted', position: 'absolute', animation: 'spin 15s linear infinite reverse' }} />
                                <ScienceIcon sx={{ fontSize: '4rem', color: '#0061A4', opacity: 0.8 }} />

                                {/* Floating floating stat card */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 30,
                                        right: -20,
                                        bgcolor: 'background.paper',
                                        p: 2,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircleOutlineIcon sx={{ color: '#2e7d32' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ display: 'block', mb: 0.5, letterSpacing: 1 }}>
                                            MODEL PERFORMANCE
                                        </Typography>
                                        <Typography variant="body1" fontWeight={800} color="text.primary">
                                            99.8% Accuracy
                                        </Typography>
                                    </Box>
                                </Box>
                                <style>
                                    {`
                      @keyframes spin { 100% { transform: rotate(360deg); } }
                    `}
                                </style>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default withTheme(HomeHero);
