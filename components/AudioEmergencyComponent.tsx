import { Box, Grid, IconButton, Stack, Divider } from '@mui/material';
import {useState} from "react";
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import useAudioPlayer from './useAudioPlayer';
// import Play from "./Play";
// import Pause from "./Pause";
// // import Bar from "./Bar";


export interface AudioEmergency {
    transcribedText: string
    urlLink: string
    timeStamp: string
}

interface AudioEmergencyComponentProps {
    audioEmergencies?: [AudioEmergency]
}

const AudioEmergencyComponent = ({ audioEmergencies }: AudioEmergencyComponentProps) => {

    // const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
    const theme = useTheme();
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';

    return (
        <div className="wrapper" style={{ padding: '20px 15px'}}>
            {audioEmergencies?.map(({ transcribedText, urlLink, timeStamp }) =>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack>
                            <Typography variant="subtitle1"
                                sx={{ padding: '15px'}}>
                                <span style={{ fontWeight: 500 }}>Timestamp:</span> {timeStamp}<br  />
                                <span style={{ fontWeight: 500 }}>Transcription:</span> {transcribedText}
                            </Typography>
                            
                        </Stack> 
                    </Grid>
                    <Grid item xs={6} sx={{ position: 'relative' }}> 
                        <Stack direction="row" spacing={2} 
                            sx={{ 
                                    position: 'absolute', 
                                    bottom: 0, 
                                    right: '10px',
                                    width: '300px',
                                    
                                }}>
                            
                            <div className="controls">
                                {/* {playing ? 
                                <Pause handleClick={() => setPlaying(false)}
                                    sx={{ fontSize: '1.5rem' }}
                                    htmlColor={mainIconColor}
                                /> :
                                <Play handleClick={() => setPlaying(true)} 
                                    sx={{ fontSize: '1.5rem' }} htmlColor={mainIconColor} />
                                } */}
                                {/* <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/> */}
                            </div>
                            <Box sx={{ width: '100%', overflow: 'hidden', margin: 0 }}>
                                <audio 
                                    id= "audio"
                                    controls
                                    style={{ marginRight: '10px' }} 
                                    >
                                        <source src={urlLink} /> 
                                    </audio>
                            </Box>
                        </Stack>
                        
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default AudioEmergencyComponent;