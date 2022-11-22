// import React, { useState } from 'react'
import React from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import { TextField, Card } from '@mui/material';
// import Box from "@mui/material/Box"
import ShortcutIcon from '@mui/icons-material/Shortcut'
// import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material';
import { CssBaseline } from '@mui/material';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';



export default function JumpContainer({ eventUpdater, runUpdater }) {

    const [eventIDReq, setEventIDReq] = React.useState({
        run_id: 0,
        event_number: 1
    })

    const handleChangeRunIDReq = (event) => {
        setEventIDReq({ ...eventIDReq, run_id: event.target.value })
    }

    // const handleJumpRunID = () => {
    //     setEvent({ ...eventID, run_id: Number(eventIDReq.run_id) })
    // }

    const handleJumpRunID = () => {
        if (!isNaN(Number(eventIDReq.run_id))) {
            runUpdater(eventIDReq.run_id)()
        }
    }

    const handleChangeEventNumberReq = (event) => {
        setEventIDReq({ ...eventIDReq, event_number: event.target.value })
    }

    const handleJumpEventNumber = () => {
        if (!isNaN(Number(eventIDReq.event_number))) {
            eventUpdater(eventIDReq.event_number)()
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                sx={{
                    display: 'flex',
                    flexGrow: 0.5,
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        m: 1,
                        p: 1,
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    elevation={3}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }}
                        variant="h6">
                        Run select
                    </Typography>
                    <CardActions>
                        <TextField
                            label="Run"
                            onChange={handleChangeRunIDReq}
                            value={eventIDReq.run_id}
                            size="small"
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,

                            }}
                            onKeyDown={e => {
                                if (e.code === 'Enter') {
                                    handleJumpRunID()
                                }
                            }
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={handleJumpRunID}
                            size="small"
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,


                            }}
                        >
                            <ShortcutIcon />
                        </Button>
                    </CardActions>
                </Card>
                <Card
                    sx={{
                        display: 'flex',
                        m: 1,
                        p: 1,
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    elevation={3}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }}
                        variant="h6">
                        Event select
                    </Typography>
                    {/* <CardContent>
                        <Typography>
                            Jump event number
                        </Typography>
                    </CardContent> */}
                    <CardActions>
                        <TextField
                            label="Event"
                            onChange={handleChangeEventNumberReq}
                            value={eventIDReq.event_number}
                            size="small"
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,
                                fontSize: 14,
                            }}
                            onKeyDown={e => {
                                if (e.code === 'Enter') {
                                    handleJumpEventNumber()
                                }
                            }
                            }
                        />
                        <Button
                            variant="contained"
                            onClick={handleJumpEventNumber}
                            size="small"
                            sx={{
                                display: 'flex',
                                m: 1,
                                p: 1,
                                flexGrow: 1,


                            }}
                        >
                            <ShortcutIcon />
                        </Button>
                    </CardActions>
                </Card>


                {/* <Grid container spacing={10}>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <TextField
                                    label="Run"
                                    onChange={handleChangeRunIDReq}
                                    value={eventIDReq.run_id}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleJumpRunID}
                                    size="small"
                                >
                                    <ShortcutIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <TextField
                                    label="Event"
                                    onChange={handleChangeEventNumberReq}
                                    value={eventIDReq.event_number}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleJumpEventNumber}
                                    size="small"
                                >
                                    <ShortcutIcon />
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Container>
        </React.Fragment >
    );
}
