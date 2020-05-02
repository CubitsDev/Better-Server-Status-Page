import React from 'react';
import './custom.css';

const name = "Test";
const nodePort = "1234";
const gameServerIP = "RP.SuperiorServers.co";
const gameServerPort = "27015";
const gameServerType = "garrysmod"; // Must be a Gamedig game type! List at: https://www.npmjs.com/package/gamedig

async function getData(url = '', callback) {
  var r;
  const getData = await fetch(url, {
    method: 'GET',
    cache: 'no-cache'
  })
  .then(response =>{
    response.text().then(function (text) {
      r = text;
      return callback(r);
    });
  })
  .catch(error => {
    console.error(error)
    return callback("err");
  });
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {statusClass: "status status-active status-unknown", time: 5};
    this.time = 0;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.time === 5) {
      this.time = 0;
      this.setState({time: 5});
      var curPing;
      var newState;
      var url = "http://localhost:" + nodePort + "/?ip=" + gameServerIP + "&port=" + gameServerPort + "&type=" + gameServerType;
      var tt = this;
      getData(url, async function callback(response) {
        console.log(response);
        curPing = parseInt(response);
        if (curPing > 20) {
          newState = "status status-active status-slow";
          tt.changeState(newState);
        } else if (curPing < 20) {
          newState = "status status-active status-ok";
          tt.changeState(newState);
        } else {
          newState = "status status-active status-down";
          tt.changeState(newState);
        }
      })

    } else {
      this.time++;
      var temp = this.state.time;
      this.setState({time: temp - 1});
    }
  }
  
  changeState(newState) {
    this.setState({statusClass: newState});
  }


  render() {
    return (
      <div>
      <div className="container" id="container">
        <h1>{name} Service Status</h1>
        <br/>
        <center>Game Server Status</center>
        <br/>
        <div id="statusHold">
        <div className={this.state.statusClass} id="status"></div>
        </div>
      </div>
      <footer>
        <div id="intervalStatus">Refreshing in <span id="sec">{this.state.time}</span> seconds</div>
      </footer>
      </div>
    );
  }
  
}
export default App;
