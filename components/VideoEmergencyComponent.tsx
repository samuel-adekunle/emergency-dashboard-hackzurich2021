import { Box, Grid, IconButton, Stack } from '@mui/material';
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface VideoEmergency {
    urlLink: string
    timeStamp: string
}

interface VideoEmergencyComponentProps {
    videoEmergencies?: [VideoEmergency]
} 

const VideoEmergencyComponent = ({ videoEmergencies }: VideoEmergencyComponentProps) => {
    return (
        <div className="wrapper">
            {videoEmergencies?.map(({ urlLink, timeStamp }) =>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1"
                            sx={{ padding: '15px'}}>
                            <span style={{ fontWeight: 500 }}>Timestamp:</span> {timeStamp}<br  />
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" spacing={2}>
                            <div className="controls">
                            </div>
                            <Box sx={{ width: '100%', overflow: 'hidden', margin: 0 }}>
                            <video 
                                height= "200"
                                width= "300"
                                controls
                                muted 
                                autoplay 
                                >
                                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                            </video>

 
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default VideoEmergencyComponent;