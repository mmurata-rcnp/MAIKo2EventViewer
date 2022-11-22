// // import logo from './logo.svg';
// import './App.css';

// import { Stage, Layer, Rect, Circle } from 'react-konva';

// function App() {
//   return (
//     <Stage width={window.innerWidth} height={window.innerHeight}>
//       <Layer>
//         <Rect width={50} height={50} fill="red" />
//         <Circle x={200} y={200} stroke="black" radius={50} />
//       </Layer>
//     </Stage>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>

//     // </div>
//   );
// }

//  export default App;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
// import { Stage, Layer, Star, Text } from 'react-konva';
// import GraphCanvas from './components/GraphCanvas';
import Header from './components/Header'
import Visualizer from './components/Visualizer';
import Footer from './components/Footer'
// import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import JumpContainer from './components/JumpContainer';
// import { blue } from '@mui/material/colors';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';
// import { ContentCutOutlined } from '@mui/icons-material';

const findNearestNeighbors = (sorted, val) => {
  // console.log("Binary search " + sorted + " / " + sorted.length + " " + val)
  if (sorted.length === 0) {
    return [-1, -1]
  }
  else if (val < sorted.at(0)) {
    return [-1, sorted.at(0)]
  }
  else if (sorted.at(sorted.length - 1) < val) {
    return [sorted.at(sorted.length - 1), -1]
  }
  else if (sorted.length === 1) { // val == sorted[0]
    return [-1, -1]
  }
  else if (sorted.length === 2) { // sorted[0] <= val <= sorted[1]
    if (sorted[0] === val) {
      return [-1, sorted.at(1)]
    }
    else if (sorted[1] === val) {
      return [sorted.at(0), -1]
    }
    else {
      return [sorted.at(0), sorted.at(1)]
    }
  }
  else { //length > 2
    let low = 0
    let high = sorted.length - 1

    if (sorted.at(0) === val) {
      return [-1, sorted.at(1)]
    }
    else if (sorted.at(sorted.length - 1) === val) {
      return [sorted.at(sorted.length - 2), -1]
    }

    while (high - low > 1) {
      let mid = (low + high) / 2
      let mid_val = sorted.at(mid)
      // console.log("mid_val " + mid_val)
      if (mid_val < val) {
        low = mid
      }
      else if (val < mid_val) {
        high = mid
      }
      else {// if (val == mid_val) {
        // console.log("Find-> " + [sorted.at(mid - 1), sorted.at(mid + 1)])
        return [sorted.at(mid - 1), sorted.at(mid + 1)]
      }
    }
    // console.log("Break-> " + [sorted.at(low), sorted.at(high)])
    return [sorted.at(low), sorted.at(high)]
  }

}

const App = () => {
  // const [stars, setStars] = React.useState(INITIAL_STATE);

  // const handleDragStart = (e) => {
  //   const id = e.target.id();
  //   setStars(
  //     stars.map((star) => {
  //       return {
  //         ...star,
  //         isDragging: star.id === id,
  //       };
  //     })
  //   );
  // };
  // const handleDragEnd = (e) => {
  //   setStars(
  //     stars.map((star) => {
  //       return {
  //         ...star,
  //         isDragging: false,
  //       };
  //     })
  //   );
  // };

  const [eventID, setEventID] = React.useState({
    run_id: 1,
    event_number: 1
  })

  const [eventData, setEventData] = React.useState({ AnodeHit: [], CathodeHit: [] })
  useEffect(() => {
    // For development
    // let apiURL = "/get/" + eventID.run_id + "/" + eventID.event_number
    // For build
    // let apiURL = "http://cogito:8080/get/" + eventID.run_id + "/" + eventID.event_number
    let apiURL = String(process.env.REACT_APP_API_URI_PREFIX) + eventID.run_id + "/" + eventID.event_number
    // console.log(process.env.REACT_APP_API_URI_PREFIX)
    // console.log("URL " + apiURL)
    // console.log(process.env.REACT_APP_HOGE)
    fetch(apiURL, { mode: "cors" })
      .then(
        res => {
          console.dir(res.body, { depth: null });
          console.dir(res.headers, { depth: null });
          console.log("Response ok-> " + res.ok);
          // res.text().then((t) => {
          //   console.log("text " + t)
          // })
          //   .catch((err) => {
          //     console.log("text error " + err)
          //   })
          // console.log("Response text-> " + res.text());
          res.json()
            .then(json => {
              setEventData(json);
              console.log("OK -> " + json);
            }).catch(err => {
              console.log("Parse NG -> " + err);
              setEventData({ AnodeHit: [], CathodeHit: [], Error: err });
            }
            )
        }
      )
      .catch(err => {
        console.log("Connection NG -> " + err);
        setEventData({ AnodeHit: [], CathodeHit: [], Error: err });
      })
  }, [eventID])

  const eventFound = 'Error' in eventData ? false : true
  // const [runIDReq, setRunIDReq] = React.useState(0)

  // const handleChangeRunIDReq = (event) => {
  //   setRunIDReq(event.target.value)
  // }

  // const handleJumpRunID = event => {
  //   setEventID({ ...eventID, run_id: Number(runIDReq) })
  //   console.log("jump run id " + runIDReq + " from " + eventID.run_id)
  // }

  // const [eventNumberReq, setEventNumberReq] = React.useState(0)

  // const handleChangeEventNumberReq = (event) => {
  //   setEventNumberReq(event.target.value)
  // }

  // const handleJumpEventNumber = event => {
  //   setEventID({ ...eventID, event_number: Number(eventNumberReq) })
  //   console.log("jump run id " + eventNumberReq + " from " + eventID.event_number)
  //   console.log(eventID)
  // }

  const [eventList, setEventList] = useState([])
  const updateEventList = (list) => { setEventList(list) }

  const runIDUpdater = (run_id) => () => {
    setEventID({ ...eventID, run_id: Number(run_id), event_number: 1 })
  }

  // const eventNumberUpdater = useCallback((event_number) => () => {
  //   setEventID({ ...eventID, event_number: Number(event_number) })
  // }, [eventID])
  const eventNumberUpdater = (event_number) => () => {
    setEventID({ ...eventID, event_number: Number(event_number) })
  }

  const handleIncrementEventNumber = useCallback(() => {
    let eventCurrent = eventID.event_number
    let eventNext = eventList.length > 0 ? findNearestNeighbors(eventList, eventCurrent).at(1) : eventCurrent + 1
    setEventID({ ...eventID, event_number: eventNext })
    // setEventID({ ...eventID, event_number: eventID.event_number + 1 })
  }, [eventID, eventList])

  const handleDecrementEventNumber = () => {
    if (eventID.event_number > 1) {
      let eventCurrent = eventID.event_number
      let eventNext = eventList.length > 0 ? findNearestNeighbors(eventList, eventCurrent).at(0) : eventCurrent - 1
      setEventID({ ...eventID, event_number: eventNext })
      // setEventID({ ...eventID, event_number: eventID.event_number - 1 })
    }
  }

  const handleIncrementRunID = () => {
    setEventID({ ...eventID, run_id: eventID.run_id + 1, event_number: 1 })
  }

  const handleDecrementRunID = () => {
    if (eventID.run_id > 1) {
      setEventID({ ...eventID, run_id: eventID.run_id - 1, event_number: 1 })
    }
  }

  const [playInterval, setPlayInterval] = React.useState(1000)

  const [playStatus, setPlayStatus] = React.useState({
    playing: false
  });

  const incrementEventRef = useRef(handleIncrementEventNumber)
  useEffect(() => {
    incrementEventRef.current = handleIncrementEventNumber
  }, [handleIncrementEventNumber])

  const handlePlayEvent = () => { setPlayStatus({ ...playStatus, playing: true }) }
  const handleStopEvent = () => { setPlayStatus({ ...playStatus, playing: false }) }

  useEffect(() => {
    // console.log("EFFECT")
    const tick = () => { incrementEventRef.current() }
    if (playStatus.playing) {
      const id = setInterval(tick, playInterval)
      // const id = setInterval(() => { console.log("switch") }, 1000)
      // const id = setInterval(() => { handleIncrementEventNumber() }, 1000)
      // console.log("switch")
      return () => { clearInterval(id) }
      // return () => { }
    }
    else {
      return () => { }
    }
  }, [playStatus.playing, playInterval])



  if (eventFound === false && playStatus.playing) {
    // setPlayStatus({ ...playStatus, playing: false })
    handleStopEvent()
  }

  const handleExportData = () => {
    const comment = "The data of event " + String(eventID.event_number) + " in run " + String(eventID.run_id).padStart(4, '0') + ". This file is created by MAIKo2 event viewer."
    const now = new Date()
    const now_formatted = now
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
      .split("/")
      .join("-");
    const data = { Comment: comment, CreatedOn: now_formatted, Run: eventID.run_id, Event: eventID.event_number, ...eventData }
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "run" + eventID.run_id + "_" + eventID.event_number + ".json";
    link.click();
  }



  const goToFirstEvent = useCallback(() => {
    if (eventList.length > 0) {
      // const jump = eventNumberUpdater(eventList.at(0))
      // console.log(eventList.at(0))
      // jump()
      setEventID({ ...eventID, event_number: eventList.at(0) })
    }
    else {
      // eventNumberUpdater(1)()
      setEventID({ ...eventID, event_number: 1 })
    }
    // COMMENT: DO NOT CARE FOR "eventID", BECAUSE THIS VALUE IS UPDATED FOR EVERY RENDERING
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventList])

  const goToLastEvent = () => {
    if (eventList.length > 0) {
      const jump = eventNumberUpdater(eventList.at(eventList.length - 1))
      jump()
    }
  }



  useEffect(() => {
    //Jump to first event in event list
    if (eventList.length > 0) {
      goToFirstEvent()
    }
  }, [eventList, goToFirstEvent])

  // console.log(eventData.anodeFADC)
  return (
    <div>
      <Header
        onSelectInterval={(interval) => { setPlayInterval(interval) }}
        currentInterval={playInterval}
        playing={playStatus.playing}
        handleExportData={handleExportData}
        updateEventList={updateEventList}
        onGoToFirst={goToFirstEvent}
        onGoToLast={goToLastEvent}
      ></Header>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Run {eventID.run_id}, Event {eventID.event_number}
      </Typography>
      {
        (() => {
          if (eventData.Error) {
            // return (<Typography
            //   variant="h5"
            //   component="div" sx={{
            //     flexGrow: 1,
            //     fontSize: '0.875rem',
            //     fontWeight: '700',
            //   }}
            // >
            //   Error : {eventData.Error}
            // </Typography>);
            return (<Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              An error occurred while loading the event — <strong>{(eventData && eventData.Error) ? eventData.Error : ""}</strong>
            </Alert>)
          }
          else {
            return (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                The event is successfully loaded — <strong>OK</strong>
              </Alert>)
          }
        })()
      }
      <Visualizer
        anodeHit={eventData.AnodeHit != null ? eventData.AnodeHit : []}
        cathodeHit={eventData.CathodeHit != null ? eventData.CathodeHit : []}
        anodeFADC={eventData.AnodeFADC != null ? eventData.AnodeFADC : []}
        cathodeFADC={eventData.CathodeFADC != null ? eventData.CathodeFADC : []}
        canvasDisabled={eventData.Error ? true : false}
      />
      {/* <div style={{ width: '50%' }}>
        <Box
          sx={{
            display: 'flex',
            m: 1,
            p: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
        >
          {"I'm a flexbox container that uses flex!"}
          <Box
            sx={{
              display: 'flex',
              m: 1,
              p: 1,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: '700',
            }}>
            alt
          </Box>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            m: 1,
            p: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
        >
          {"I'm a flexbox container that uses inline-flex!"}
        </Box>
      </div> */}
      {/* <Button variant="contained">Hello World</Button> */}
      {/* <div>
        <label>
          Run
        </label>
        <input
          type="text"
          name="run_id_input"
          onChange={handleChangeRunIDReq}
          value={runIDReq}
        ></input>
        <button onClick={handleJumpRunID}>
          jump to run {runIDReq}
        </button>
      </div> */}
      {/* <div>
        <Typography>
          Event
        </Typography>
        <TextField type="text"
          name="run_id_input"
          onChange={handleChangeEventNumberReq}
          value={eventNumberReq} />
        <Button onClick={handleJumpEventNumber} variant="contained">
          jump to event {eventNumberReq}
        </Button>
      </div> */}
      <JumpContainer
        eventUpdater={eventNumberUpdater}
        runUpdater={runIDUpdater}
      ></JumpContainer>

      {/* <GraphCanvas width={100} height={100} />
      <GraphCanvas width={600} height={600} xmin={0} xmax={768} /> */}
      <Footer
        incrementEvent={handleIncrementEventNumber}
        decrementEvent={handleDecrementEventNumber}
        incrementRun={handleIncrementRunID}
        decrementRun={handleDecrementRunID}
        eventFound={eventFound}
        // playStatus={playStatus}
        playStatus={playStatus}
        // setPlayStatus={setPlayStatus}
        handlePlayEvent={handlePlayEvent}
        handleStopEvent={handleStopEvent}
      />
    </div>
    // <Stage width={window.innerWidth} height={window.innerHeight}>
    //   <Layer>
    //     <Text text="Try to drag a star" />
    //     {stars.map((star) => (
    //       <Star
    //         key={star.id}
    //         id={star.id}
    //         x={star.x}
    //         y={star.y}
    //         numPoints={5}
    //         innerRadius={20}
    //         outerRadius={40}
    //         fill="#89b717"
    //         opacity={0.8}
    //         draggable
    //         rotation={star.rotation}
    //         shadowColor="black"
    //         shadowBlur={10}
    //         shadowOpacity={0.6}
    //         shadowOffsetX={star.isDragging ? 10 : 5}
    //         shadowOffsetY={star.isDragging ? 10 : 5}
    //         scaleX={star.isDragging ? 1.2 : 1}
    //         scaleY={star.isDragging ? 1.2 : 1}
    //         onDragStart={handleDragStart}
    //         onDragEnd={handleDragEnd}
    //       />
    //     ))}
    //   </Layer>
    // </Stage>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
export default App;