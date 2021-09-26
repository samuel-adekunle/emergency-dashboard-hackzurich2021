import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Slider, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;
  const theme = useTheme();

  const curPercentage = (curTime / duration) * 100;

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    });

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    // const bar = React.createRef();
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    // document.addEventListener("mousemove", updateTimeOnMove);

    // document.addEventListener("mouseup", () => {
    //   document.removeEventListener("mousemove", updateTimeOnMove);
    // });
  }

  return (
    <div className="bar">
      <Slider
        // ref={this.bar}
        size="small"
        value={curTime}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setClickedTime(time)}
        onMouseDown={e => handleTimeDrag(e)}
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
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
            }}
            >
            <TinyText>{formatDuration(50)}</TinyText>
            <TinyText>-{formatDuration(200)}</TinyText>
        </Box>
    </div>
  );
}
