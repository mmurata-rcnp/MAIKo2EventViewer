import React, { useState } from 'react'
// import SignalCanvas from "./SignalCanvas";
// import TrackCanvas from "./TrackCanvas";
import TrackCanvasWithButtons from './TrackCanvasWithButtons';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
// import Container from '@mui/material/Container'
import { CssBaseline, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Chip } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import MultiSignalCanvas from './MultiSignalCanvas';


const signalList = [...Array(48)].map((c, i) => {
    return {
        name: (i < 24 ? ("A-" + String(i).padStart(2, '0')) : ("C-" + String(i - 24).padStart(2, '0'))), plane: (i < 24 ? "anode" : "cathode"), channel: (i % 24)
    }
})

const signalColors = [{ name: 'red', color: '#f44336' },
{ name: 'pink', color: '#e91e63' },
{ name: 'purple', color: '#9c27b0' },
{ name: 'deepPurple', color: '#673ab7' },
{ name: 'indigo', color: '#3f51b5' },
{ name: 'blue', color: '#2196f3' },
{ name: 'lightBlue', color: '#03a9f4' },
{ name: 'cyan', color: '#00bcb4' },
{ name: 'teal', color: '#009688' },
{ name: 'green', color: '#4caf50' },
{ name: 'lightGreen', color: '#8bc34a' },
{ name: 'lime', color: '#cddc39' },
{ name: 'yellow', color: '#ffeb3b' },
{ name: 'amber', color: '#ffc107' },
{ name: 'orange', color: '#ff9800' },
{ name: 'yellow', color: '#ffeb3b' },
{ name: 'deepOrange', color: '#ff5722' },
{ name: 'brown', color: '#795548' },
{ name: 'grey', color: '#9e9e9e' },
{ name: 'blueGrey', color: '#607d8b' },
]

const anodeDefaultColor = signalColors.find((element) => (element.name === "indigo")).color
const cathodeDefaultColor = signalColors.find((element) => (element.name === "pink")).color

function Visualizer({ anodeHit, cathodeHit, anodeFADC, cathodeFADC, canvasDisabled = false }) {

    // let aHit = props.event.AnodeHit != null ? props.event.AnodeHit : new Array()
    // let cHit = props.event.CathodeHit != null ? props.event.CathodeHit : new Array()
    // console.log(aHit)
    // console.log(cathodeFADC)
    // console.log(anodeFADC)
    // const arrTmp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [signalDrawn, setSignalDrawn] = useState([])


    const [signalSubmission, setSignalSubmission] = useState({ name: signalList.at(0).name, color: anodeDefaultColor })
    const handleNameChange = (event) => {
        setSignalSubmission({ ...signalSubmission, name: event.target.value })
    }
    const handleColorChange = (event) => {
        setSignalSubmission({ ...signalSubmission, color: event.target.value })
    }
    const submitSignal = () => {
        if (signalSubmission.name && signalSubmission.color) {
            if (signalDrawn.find(element => element.name === signalSubmission.name)) {
                setSignalDrawn(signalDrawn.map((element) => (element.name === signalSubmission.name ? { ...element, color: signalSubmission.color } : element)))
            }
            else {
                setSignalDrawn([...signalDrawn, signalSubmission])
            }

        }
    }

    // let signalInfo = signalList.find(elemSig => (elemSig.name === "C-1"))
    const makeSignalColors = () => {
        return (signalDrawn.map((elem) => {
            let signalInfo = signalList.find((elemSig) => (elemSig.name === elem.name))
            let signals = signalInfo.plane === "anode" ? anodeFADC[signalInfo.channel] : cathodeFADC[signalInfo.channel]
            return { color: elem.color, signals: (signals ? signals : []) };
            // return { color: elem.color }
        }
        ));
    }
    // console.log(makeSignalColors())

    const handleDelete = (chipToDelete) => () => {
        setSignalDrawn((signals) => signals.filter((signal) => signal.name !== chipToDelete.name));
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <Box
                sx={{
                    display: 'flex',
                    // flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                    },
                    left: 0,
                    right: 0
                }}
                alignItems='center'
            >
                <Paper elevation={3}
                    sx={{
                        display: 'flex',
                        m: 1,
                        p: 1,
                        flexDirection: 'column',
                        height: 350
                    }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }}
                        variant="h6"
                    >
                        Anode
                    </Typography>
                    <TrackCanvasWithButtons id={"anode image"} width={300} height={300} title={""}
                        xmin={0} xmax={768} ymin={0} ymax={2048}
                        xtitle={"Position [strip]"} ytitle={"Time [clock]"} hits={anodeHit}
                        color={anodeDefaultColor}
                        onButtonSelect={(ch, color) => {
                            let name = "A-" + String(ch).padStart(2, '0')
                            if (signalDrawn.find(element => element.name === name)) {
                                setSignalDrawn(signalDrawn.map((element) => (element.name === name ? { ...element, color: color } : element)))
                            }
                            else {
                                setSignalDrawn([...signalDrawn, { name: name, color: color }])
                            }
                        }
                        }
                        disabled={canvasDisabled}
                    />
                </Paper>
                <Paper elevation={3}
                    sx={{
                        display: 'flex',
                        m: 1,
                        p: 1,
                        flexDirection: 'column',
                        height: 350
                    }}>
                    <Typography
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }}
                        variant="h6">
                        Cathode
                    </Typography>
                    <TrackCanvasWithButtons
                        id={"cathode image"} width={300} height={300} title={""}
                        xmin={0} xmax={768} ymin={0} ymax={2048}
                        xtitle={"Position [strip]"} ytitle={"Time [clock]"} hits={cathodeHit}
                        color={cathodeDefaultColor}
                        onButtonSelect={(ch, color) => {
                            let name = "C-" + String(ch).padStart(2, '0')
                            if (signalDrawn.find(element => element.name === name)) {
                                setSignalDrawn(signalDrawn.map((element) => (element.name === name ? { ...element, color: color } : element)))
                            }
                            else {
                                setSignalDrawn([...signalDrawn, { name: name, color: color }])
                            }
                        }}
                        disabled={canvasDisabled}
                    />
                </Paper>
                {
                    (() => {
                        if (signalDrawn.length > 0) {
                            return (<Paper
                                elevation={3}
                                sx={{
                                    display: 'flex',
                                    m: 1,
                                    p: 1,
                                    flexDirection: 'column'
                                }}>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        flexGrow: 1,
                                    }}
                                    variant="h6">
                                    FADC signals
                                </Typography>
                                < MultiSignalCanvas
                                    id={"Signal"} width={300} height={300} title={""}
                                    xmin={0} xmax={1024} ymin={0} ymax={1024}
                                    xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                                    signalColors={makeSignalColors()}
                                    color="red"
                                    disabled={canvasDisabled}
                                />
                            </Paper>);
                        }
                    })()
                }
                <Paper
                    sx={{
                        display: 'flex',
                        m: 1,
                        p: 1,
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 350
                    }}
                    elevation={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            m: 1,
                            p: 1,
                            flexGrow: 1,
                            height: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                display: 'flex',
                                flexGrow: 1,
                            }}
                            variant="h6">
                            Signal select
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            m: 1,
                            p: 1,
                            flexGrow: 1,
                        }}
                        style={{ overflow: 'auto', height: 300 }}
                    >
                        <List
                            sx={{
                                display: 'flex',
                                // flexWrap: 'wrap',
                                flexDirection: 'column',
                                m: 1,
                                p: 1,
                            }}>
                            {
                                [...signalDrawn].map((comp, i) => {
                                    return (<ListItem key={comp.name}>
                                        <Chip id={i} value={comp.name}
                                            sx={{
                                                bgcolor: comp.color,
                                            }}
                                            label={comp.name}
                                            onDelete={handleDelete(comp)} />
                                    </ListItem>);
                                })
                            }
                        </List>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            m: 1,
                            p: 1,
                            flexGrow: 1,
                            // height: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FormControl
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,
                                fontSize: 14,
                            }}>
                            <InputLabel id="signal-select">Channel</InputLabel>
                            <Select
                                labelId="signal-select"
                                id="signal-select"
                                value={signalSubmission.name}
                                label="signals"
                                onChange={handleNameChange}
                                size='small'
                            >
                                {
                                    signalList.map((comp, i) => {
                                        return (<MenuItem id={i} value={comp.name}>{comp.name}</MenuItem>);
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,
                                fontSize: 14,
                            }}>
                            <InputLabel id="signal-color-select">Color</InputLabel>
                            <Select
                                labelId="signal-color-select"
                                id="signal-color-select"
                                value={signalSubmission.color}
                                label="signals"
                                onChange={handleColorChange}
                                size='small'
                            >
                                {
                                    signalColors.map((comp, i) => {
                                        return (<MenuItem id={i} value={comp.color} sx={{ color: comp.color }}>
                                            {comp.name.charAt(0).toUpperCase() + comp.name.slice(1)}
                                        </MenuItem>);
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,
                                size: 'small',
                            }}
                            variant='contained'
                            onClick={submitSignal}>
                            Add
                        </Button>
                    </Box>
                </Paper>
                {/* <Paper elevation={3}
                        sx={{
                            display: 'flex',
                            m: 1,
                            p: 1,
                        }}>
                        < SignalCanvas
                            id={"cathode-" + 1} width={600} height={100} title={"cathode-" + 1}
                            xmin={0} xmax={1024} ymin={0} ymax={1024}
                            xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                            signals={cathodeFADC[1] ? cathodeFADC[1] : []}
                            color="red"
                        />
                    </Paper> */}
            </Box>

            {/* {[...Array(24)].map((_, index) => {
                console.log(index);
                return (
                    < SignalCanvas
                        id={"cathode-" + index} width={100} height={100} title={"cathode-" + index}
                        xmin={0} xmax={1024} ymin={0} ymax={1024}
                        xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                        signals={cathodeFADC[index] ? cathodeFADC[index] : []}
                        color="red"
                    />)
            })}
            {[...Array(24)].map((_, index) => {
                console.log(index);
                return (
                    < SignalCanvas
                        id={"anode-" + index} width={100} height={100} title={"anode-" + index}
                        xmin={0} xmax={1024} ymin={0} ymax={1024}
                        xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                        signals={anodeFADC[index] ? anodeFADC[index] : []}
                        color="blue"
                    />)
            })} */}

            {/* < SignalCanvas
                id={"cathode-" + 1} width={100} height={100} title={"cathode-" + 1}
                xmin={0} xmax={1024} ymin={0} ymax={1024}
                xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                signals={cathodeFADC[1] ? cathodeFADC[1] : []}
                color="blue"
            />
            <SignalCanvas
                id={"cathode-0"} width={100} height={100} title={"cathode-0"}
                xmin={0} xmax={1024} ymin={0} ymax={1024}
                xtitle={"Time [FADC clock]"} ytitle={"FADC [ch]"}
                signals={cathodeFADC[0] ? cathodeFADC[0] : []}
                color="blue"
            /> */}
        </React.Fragment >
    )
}

export default Visualizer;