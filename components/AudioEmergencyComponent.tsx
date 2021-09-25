import { Box, Slider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const AudioEmergencyComponent = () => {
    const theme = useTheme();
    const duration = 200;
    const [position, setPosition] = React.useState(32);

    return (
        <div className="wrapper">
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => setPosition(value)}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    height: 4,
                    '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px ${
                        theme.palette.mode === 'dark'
                            ? 'rgb(255 255 255 / 16%)'
                            : 'rgb(0 0 0 / 16%)'
                        }`,
                    },
                    '&.Mui-active': {
                        width: 20,
                        height: 20,
                    },
                    },
                    '& .MuiSlider-rail': {
                    opacity: 0.28,
                    },
                }}
                />
            </Box>
        </div>
    );
}

export default AudioEmergencyComponent;