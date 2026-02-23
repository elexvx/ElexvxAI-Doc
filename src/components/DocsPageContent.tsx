import React from 'react';
import { Typography, Box, Breadcrumbs, Link, Chip } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { withTheme } from '../theme/withTheme';

function DocsPageContent() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ pb: 8, maxWidth: 860, width: '100%' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                aria-label="breadcrumb"
                sx={{ mb: 4, '& .MuiBreadcrumbs-li': { fontSize: '0.85rem' } }}
            >
                <Link underline="hover" color="text.secondary" href="/docs">Docs</Link>
                <Link underline="hover" color="text.secondary" href="/docs">Core Concepts</Link>
                <Typography color="text.primary" fontWeight={600} fontSize="0.85rem">Neural Optimization</Typography>
            </Breadcrumbs>

            {/* Version and Status Chips */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                <Chip label="v2.4.0" size="small" sx={{ bgcolor: isDark ? 'rgba(141, 107, 148, 0.2)' : 'rgba(141, 107, 148, 0.1)', color: isDark ? '#d6c8db' : '#6f4a7a', fontWeight: 600, borderRadius: 1.5, px: 0.5 }} />
                <Chip label="Stable" size="small" sx={{ bgcolor: isDark ? 'rgba(164, 107, 107, 0.2)' : 'rgba(164, 107, 107, 0.1)', color: isDark ? '#dbd0c8' : '#8c5959', fontWeight: 600, borderRadius: 1.5, px: 0.5 }} />
            </Box>

            {/* Header */}
            <Typography variant="h2" component="h1" sx={{ fontWeight: 600, mb: 3, letterSpacing: '-0.01em', color: 'text.primary' }}>
                Neural Network Optimization
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1.1rem", mb: 6, lineHeight: 1.8, fontWeight: 400, maxWidth: 700 }}>
                Learn how to optimize neural network performance using ElexvxAI's core libraries. Our framework provides quantization, pruning, and distillation techniques out of the box.
            </Typography>

            {/* Section 1: Overview */}
            <Typography variant="h4" component="h2" id="overview" sx={{ fontWeight: 500, mb: 3, mt: 6, color: 'text.primary' }}>
                Overview
            </Typography>

            <Typography paragraph sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Optimization is critical for deploying large language models on edge devices. The{' '}
                <Box component="span" sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', px: 1, py: 0.2, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem', color: isDark ? '#d6c8db' : '#6f4a7a' }}>
                    elexvx-opt
                </Box>{' '}
                module provides a streamlined interface for applying state-of-the-art compression techniques without significant accuracy loss.
            </Typography>

            {/* Prerequisite Alert */}
            <Box sx={{ mt: 4, mb: 6, p: 3, borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <InfoOutlinedIcon sx={{ color: isDark ? '#d6c8db' : '#6f4a7a' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>Prerequisite</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4.5, lineHeight: 1.6 }}>
                    Ensure you have CUDA 11.8+ installed and a compatible GPU driver before running optimization scripts.
                </Typography>
            </Box>
        </Box>
    );
}

export default withTheme(DocsPageContent);
