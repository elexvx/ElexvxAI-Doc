import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Icon } from '@mui/material';
import { withTheme } from '../theme/withTheme';

interface FeatureItem {
    title: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
    image: string;
    iconBg: string;
    iconColor: string;
    icon: string;
}

interface FeatureSectionProps {
    data: FeatureItem[];
}

const FeatureSection = ({ data }: FeatureSectionProps) => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.default' : '#eaeef2' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {data.map((feature, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? '0 12px 24px -10px rgba(0,0,0,0.1)'
                                                : '0 12px 24px -10px rgba(0,0,0,0.8)'
                                    },
                                }}
                                elevation={0}
                            >
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={feature.image}
                                    alt={feature.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                bgcolor: feature.iconBg,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Icon sx={{ color: feature.iconColor }}>{feature.icon}</Icon>
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                                            {feature.title}
                                        </Typography>
                                    </Box>
                                    <Typography color="text.secondary" sx={{ lineHeight: 1.6, mb: 4, flexGrow: 1 }}>
                                        {feature.description}
                                    </Typography>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            href={feature.buttonLink}
                                            disableElevation
                                            sx={{
                                                borderRadius: 8,
                                                bgcolor: 'rgba(0, 97, 164, 0.1)',
                                                color: '#0061A4',
                                                fontWeight: 600,
                                                px: 3,
                                                py: 1,
                                                '&:hover': {
                                                    bgcolor: 'rgba(0, 97, 164, 0.2)'
                                                }
                                            }}
                                        >
                                            {feature.buttonLabel}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default withTheme(FeatureSection);
