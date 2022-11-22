import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download'
import UpdateIcon from '@mui/icons-material/Update';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToolTip from '@mui/material/Tooltip'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const options = [
    { name: "0.5 /s", interval: 2000 },
    { name: "1.0 /s", interval: 1000 },
    { name: "2.0 /s", interval: 500 }
];

export default function Header({ onSelectInterval = f => f, currentInterval = 1000, playing, handleExportData = f => f, updateEventList = f => f, onGoToFirst = f => f, onGoToLast = f => f }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [eventList, setEventList] = useState({ fileName: "", good: false })
    const inputRef = useRef(null);

    const onFileInputChange = (event) => {
        const file = event.target.files[0]
        setEventList({ ...eventList, fileName: file.name })
        const reader = new FileReader()
        reader.onload = () => {
            let replaced = reader.result.replace(/[^0-9]/g, ' ').split(' ').filter((val) => (val.length > 0)).map((val) => (Number(val)))
            let unique = Array.from(new Set(replaced))
            let sorted = [...unique].sort((a, b) => (a - b))
            if (sorted.length > 0) {
                setEventList({ ...eventList, fileName: file.name, good: true })
                updateEventList(sorted)
            }
            else {
                setEventList({ ...eventList, fileName: file.name, good: false })
                updateEventList([])
            }

        }
        reader.readAsText(file)
    };

    const fileUpload = () => {
        inputRef.current.click();
    };

    const onResetEventList = () => {
        setEventList({ ...eventList, fileName: "", good: false })
        updateEventList([])
        inputRef.current.value = ""
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        MAIKo+ event viewer
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            m: 1,
                            p: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            border: eventList.fileName.length > 0 ? 1 : 0,
                            borderRadius: 2
                        }}

                    >
                        {
                            (() => {
                                if (eventList.fileName.length > 0)
                                    return (
                                        <React.Fragment>
                                            {
                                                eventList.good ?
                                                    <ToolTip title="Event list OK">
                                                        <IconButton
                                                            size="large"
                                                            edge="start"
                                                            color="inherit"
                                                            aria-label="event-list-ok"
                                                            sx={{
                                                                mr: 0,
                                                                pr: 0,
                                                            }}
                                                            onClick={f => f}
                                                        >
                                                            <CheckCircleIcon />
                                                        </IconButton>
                                                    </ToolTip> :
                                                    <ToolTip title="Event list NG">
                                                        <IconButton
                                                            size="large"
                                                            edge="start"
                                                            aria-label="event-list-ng"
                                                            sx={{
                                                                mr: 0,
                                                                pr: 0,
                                                            }}
                                                            onClick={f => f}
                                                        >
                                                            <ErrorIcon
                                                                color="warning"
                                                            />
                                                        </IconButton>
                                                    </ToolTip>
                                            }
                                            <ToolTip title="Event list">
                                                <Box
                                                    sx={{
                                                        mx: 0,
                                                        px: 0,
                                                    }}
                                                >
                                                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}
                                                        color={eventList.good ? "#ffffff" : "#9e9e9e"}>
                                                        {"Event: " + eventList.fileName}
                                                    </Typography>
                                                </Box>
                                            </ToolTip>
                                            <ToolTip title="Reset event list">
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="reset-event-list"
                                                    // sx={{ m: 0, p: 0 }}
                                                    onClick={onResetEventList}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            </ToolTip>
                                            <ToolTip title="Go to first">
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="reset-event-list"
                                                    sx={{ mr: 0, pr: 0 }}
                                                    onClick={onGoToFirst}
                                                >
                                                    <SkipPreviousIcon />
                                                </IconButton>
                                            </ToolTip>
                                            <ToolTip title="Go to last">
                                                <IconButton
                                                    size="large"
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="reset-event-list"
                                                    sx={{ ml: 0, pl: 0 }}
                                                    onClick={onGoToLast}
                                                >
                                                    <SkipNextIcon />
                                                </IconButton>
                                            </ToolTip>
                                        </React.Fragment>
                                    )
                            })()
                        }
                        <ToolTip title="Upload event list">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="download-json"
                                // sx={{ mr: 1 }}
                                onClick={fileUpload}
                            >
                                <UploadFileIcon />
                                <input
                                    hidden
                                    ref={inputRef}
                                    type="file"
                                    accept="text/plain"
                                    onChange={onFileInputChange}
                                />
                            </IconButton>
                        </ToolTip>
                    </Box>
                    <ToolTip title="Download JSON">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="download-json"
                            sx={{ mr: 1 }}
                            onClick={handleExportData}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </ToolTip>
                    <ToolTip title="Speed of play">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="download-json"
                            sx={{ mr: 1 }}
                            onClick={handleClick}
                        >
                            <UpdateIcon />
                        </IconButton>
                    </ToolTip>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {options.map((option, i) => (
                            <MenuItem
                                key={option.name}
                                onClick={() => {
                                    if (!playing) {
                                        handleClose()
                                        onSelectInterval(option.interval)
                                    }
                                }
                                }
                                selected={option.interval === currentInterval}
                            >
                                {option.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}