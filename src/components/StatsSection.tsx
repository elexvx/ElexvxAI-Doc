import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { withTheme } from '../theme/withTheme';

interface StatItem {
    value: string;
    label: string;
}

interface StatsSectionProps {
    data: StatItem[];
}

const StatsSection = ({ data }: StatsSectionProps) => {
    return (
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.default' : '#f4f7f9', borderRadius: 4, py: 6, px: 4 }}>
                    <Grid container spacing={4} justifyContent="center" textAlign="center">
                        {data.map((stat, index) => (
                            <Grid size={{ xs: 6, md: 3 }} key={index}>
                                <Typography
                                    variant="h2"
                                    component="div"
                                    sx={{
                                        color: '#0061A4',
                                        fontWeight: 500,
                                        mb: 1,
                                        fontSize: { xs: '3rem', md: '4rem' }
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                                >
                                    {stat.label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default withTheme(StatsSection);
