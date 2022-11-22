import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { KeyboardDoubleArrowLeft, KeyboardArrowLeft, PlayArrow, Stop, KeyboardArrowRight, KeyboardDoubleArrowRight } from '@mui/icons-material';

export default function Footer({ incrementEvent, decrementEvent, incrementRun, decrementRun, eventFound, playStatus, handlePlayEvent, handleStopEvent }) {
    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            align="center"
        >
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction label="Prev. run" icon={<KeyboardDoubleArrowLeft />}
                    onClick={decrementRun} />
                <BottomNavigationAction label="Prev. event" icon={<KeyboardArrowLeft />}
                    onClick={decrementEvent} />
                {
                    (() => {
                        if (!playStatus.playing) {
                            return < BottomNavigationAction label="Play" icon={< PlayArrow />} onClick={handlePlayEvent} />;
                        } else {
                            return <BottomNavigationAction label="Stop" icon={<Stop />} onClick={handleStopEvent} />;
                        }
                    })()
                }
                <BottomNavigationAction label="Next event" icon={<KeyboardArrowRight />}
                    onClick={incrementEvent} />
                <BottomNavigationAction label="Next run" icon={<KeyboardDoubleArrowRight />}
                    onClick={incrementRun} />
            </BottomNavigation>
        </Box>
    );
}