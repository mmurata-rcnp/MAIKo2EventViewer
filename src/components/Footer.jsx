import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import { KeyboardDoubleArrowLeft, KeyboardArrowLeft, PlayArrow, Stop, KeyboardArrowRight, KeyboardDoubleArrowRight } from '@mui/icons-material';
// import { TextField } from '@mui/material';
// import { useEffect, useRef } from 'react';

export default function Footer({ incrementEvent, decrementEvent, incrementRun, decrementRun, eventFound, playStatus, handlePlayEvent, handleStopEvent }) {


    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            align="center"
        >
            <BottomNavigation
                showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
                {/* <TextField></TextField> */}
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