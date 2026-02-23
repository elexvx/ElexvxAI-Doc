import React from 'react';
import { Grid, Typography, Box, Container, Button, Stack } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BlogCard from "./BlogCard";
import { withTheme } from '../theme/withTheme';

// Using any typed array to bypass simple static data passing
interface BlogPageContentProps {
    blogData: any[];
}

function BlogPageContent({ blogData }: BlogPageContentProps) {
    return (
        <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 10 }}>

            {/* Featured Hero Area */}
            <Box
                sx={{
                    width: '100%',
                    minHeight: 400,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#081a30' : '#0f2f4a',
                    borderRadius: 4,
                    mb: 6,
                    p: { xs: 4, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                            ? '0 20px 40px rgba(0,0,0,0.45)'
                            : '0 20px 40px rgba(10,25,47,0.24)'
                }}
            >
                {/* Abstract Background pattern (Simulated with simple radial gradients) */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0, left: '30%',
                    background: 'radial-gradient(circle at center, rgba(0,97,164,0.4) 0%, transparent 60%)',
                    opacity: 0.8,
                    zIndex: 0
                }} />
                <Box sx={{
                    position: 'absolute',
                    top: '-20%', right: '-10%', width: '80%', height: '140%',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50%',
                    zIndex: 0
                }} />

                <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            bgcolor: 'rgba(25, 118, 210, 0.2)',
                            border: '1px solid rgba(25, 118, 210, 0.4)',
                            color: '#64b5f6',
                            px: 2,
                            py: 0.5,
                            borderRadius: 8,
                            mb: 3
                        }}
                    >
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#64b5f6', mr: 1 }} />
                        <Typography variant="caption" fontWeight={700} letterSpacing={0.5}>FEATURED RESEARCH</Typography>
                    </Box>

                    <Typography variant="h2" component="h1" sx={{ color: 'common.white', fontWeight: 800, mb: 3, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Latest Research & Insights
                    </Typography>

                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 5, fontWeight: 400, lineHeight: 1.6 }}>
                        Exploring the frontiers of Artificial Intelligence, Machine Learning, and Computer Vision through our latest lab publications.
                    </Typography>

                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            bgcolor: '#1976d2',
                            color: 'white',
                            py: 1.5,
                            px: 4,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1.05rem',
                            '&:hover': { bgcolor: '#1565c0' }
                        }}
                    >
                        Read Featured Article
                    </Button>
                </Box>
            </Box>

            {/* Filter Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                    {['All Posts', 'Engineering', 'Research', 'Case Studies', 'Tutorials'].map((filter, index) => (
                        <Button
                            key={filter}
                            variant={index === 0 ? "contained" : "outlined"}
                            sx={{
                                borderRadius: 8,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                borderColor: 'divider',
                                color: index === 0 ? 'common.white' : 'text.secondary',
                                bgcolor: index === 0
                                    ? (theme) => theme.palette.mode === 'dark' ? '#081a30' : '#0f2f4a'
                                    : 'transparent',
                                '&:hover': {
                                    bgcolor: index === 0
                                        ? (theme) => theme.palette.mode === 'dark' ? '#081a30' : '#0f2f4a'
                                        : 'action.hover'
                                }
                            }}
                        >
                            {filter}
                        </Button>
                    ))}
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">Sort by:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        Newest <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </Typography>
                </Box>
            </Box>

            {/* Blog Grid */}
            <Grid container spacing={4}>
                {blogData.map((post) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.title}>
                        <BlogCard post={post} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}

export default withTheme(BlogPageContent);
