
import React from 'react';
import './App.css';

const audio = document.getElementById("beep");

class App extends React.Component {

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25*60,
    currentTimer: "Session",
    isPlaying: false,
    loop: undefined,
  }

constructor(props) {
  super(props);
  this.loop = undefined; 
}

componentWillUnmount(){
  clearInterval(this.loop);
}

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if(isPlaying) {

      clearInterval(this.loop);
      this.setState({
        isPlaying: false,
      })

    } else {
      this.setState({
        isPlaying: true,
      })
      this.loop = setInterval(() => {
        const { 
          clockCount,
          currentTimer, 
          breakCount, 
          sessionCount
          } = this.state;
        if(clockCount === 0) {
          audio.play();

          this.setState({
            currentTimer: (currentTimer === "Session") ? "Break" : "Session",
            clockCount: (currentTimer === "Session") ? (breakCount * 60) : (sessionCount * 60)

          })
        } else {
        this.setState({
          clockCount: clockCount - 1
        });}

      }, 1000)
    }
  }
  handleReset = () => {
    this.setState({
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25*60,
    currentTimer: "Session",
    isPlaying: false,
    loop: undefined,
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  }
  
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? ("0"+seconds) : seconds;
    minutes = minutes < 10 ? ("0"+minutes) : minutes;
    return `${minutes}:${seconds}`;
  }

handleBreakDecrease = () => {
  const { breakCount } = this.state;
  if(breakCount > 1) {
  this.setState({
    breakCount: breakCount - 1,
  })}
}
handleBreakIncrease = () => {
  const { breakCount } = this.state;
  if (breakCount < 60) { 
  this.setState({
    breakCount: breakCount + 1,
    })
  }
}
handleSessionDecrease = () => {
  const {sessionCount } = this.state;
  if(sessionCount > 1) {
    this.setState({
    sessionCount: sessionCount - 1,
    clockCount: (sessionCount - 1) * 60,
    })
  }
}
handleSessionIncrease = () => {
  const { sessionCount } = this.state;
  if (sessionCount < 60) {
    this.setState({
    sessionCount: sessionCount + 1,
    clockCount: (sessionCount + 1) * 60,
    })
  }
}

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer
      } = this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    }

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    }


  return (
    <div className="App">
      <div>
       <SetTimer {...breakProps} />
       <SetTimer {...sessionProps}/>
      </div>
      <div>
        <h1 id="timer-label">{currentTimer}</h1>
        <span id="time-left">{this.convertToTime(clockCount)}</span>
        <button id="start_stop" onClick={this.handlePlayPause}>play/pause</button>
        <button id="reset" onClick={this.handleReset}>reset</button>
      </div>
      
    </div>
  );
  }
}

const SetTimer = (props) =>{
  const id = props.title.toLowerCase();
  return (
    <div className="timer-container">
      <h1 id={`${id}-label`}>{props.title}</h1>
      <div>
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>-</button>
        <span id={`${id}-length`} >{props.count}</span>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>+</button>
      </div>
    </div>
  );
}


export default App;
