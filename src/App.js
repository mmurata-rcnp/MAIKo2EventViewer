import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header'
import Visualizer from './components/Visualizer';
import Footer from './components/Footer'
import { Typography } from '@mui/material';
import JumpContainer from './components/JumpContainer';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';

const findNearestNeighbors = (sorted, val) => {
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
        return [sorted.at(mid - 1), sorted.at(mid + 1)]
      }
    }
    return [sorted.at(low), sorted.at(high)]
  }

}

const App = () => {

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

    fetch(apiURL, { mode: "cors" })
      .then(
        res => {
          console.dir(res.body, { depth: null });
          console.dir(res.headers, { depth: null });
          console.log("Response ok-> " + res.ok);
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

  const [eventList, setEventList] = useState([])
  const updateEventList = (list) => { setEventList(list) }

  const runIDUpdater = (run_id) => () => {
    setEventID({ ...eventID, run_id: Number(run_id), event_number: 1 })
  }


  const eventNumberUpdater = (event_number) => () => {
    setEventID({ ...eventID, event_number: Number(event_number) })
  }

  const handleIncrementEventNumber = useCallback(() => {
    let eventCurrent = eventID.event_number
    let eventNext = eventList.length > 0 ? findNearestNeighbors(eventList, eventCurrent).at(1) : eventCurrent + 1
    setEventID({ ...eventID, event_number: eventNext })
  }, [eventID, eventList])

  const handleDecrementEventNumber = () => {
    if (eventID.event_number > 1) {
      let eventCurrent = eventID.event_number
      let eventNext = eventList.length > 0 ? findNearestNeighbors(eventList, eventCurrent).at(0) : eventCurrent - 1
      setEventID({ ...eventID, event_number: eventNext })
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
      return () => { clearInterval(id) }
    }
    else {
      return () => { }
    }
  }, [playStatus.playing, playInterval])



  if (eventFound === false && playStatus.playing) {
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
      setEventID({ ...eventID, event_number: eventList.at(0) })
    }
    else {
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
      <JumpContainer
        eventUpdater={eventNumberUpdater}
        runUpdater={runIDUpdater}
      ></JumpContainer>
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
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
export default App;