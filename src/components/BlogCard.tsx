import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlogPost {
    title: string;
    summary: string;
    date: string;
    author: string;
    tags: string[];
    image: string;
    link: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    // Use the first tag as the primary category
    const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : 'ARTICLE';

    return (
        <Card
            component="a"
            href={post.link}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: (theme) =>
                        theme.palette.mode === 'light'
                            ? '0 12px 24px -10px rgba(0,0,0,0.1)'
                            : '0 12px 24px -10px rgba(0,0,0,0.8)'
                }
            }}
            elevation={0}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                />
                <Chip
                    label={primaryTag.toUpperCase()}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(8, 26, 48, 0.9)'
                            : 'rgba(255, 255, 255, 0.9)',
                        color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#0061A4',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        letterSpacing: 0.5,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">•</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            5 min read
                        </Typography>
                    </Box>
                </Box>

                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 2, color: 'text.primary' }}>
                    {post.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, flexGrow: 1, lineHeight: 1.6 }}>
                    {post.summary}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.light', fontSize: '0.8rem' }}>
                            {post.author.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                            {post.author}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.18)' : 'rgba(0, 97, 164, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowForwardIcon sx={{ fontSize: '1.2rem', color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#0061A4' }} />
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}
