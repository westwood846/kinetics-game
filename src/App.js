import React from 'react';
import './App.css';
import { World as KineticsWorld, Body as KineticsBody, Vector } from './kinetics/kinetics';

class Body extends React.Component {
  render = () => {
    let style = {
      top: this.props.body.position.y - this.props.body.size/2 + "px", 
      left: this.props.body.position.x - this.props.body.size/2 + "px",
      width: this.props.body.size + "px",
      height: this.props.body.size + "px",
    }
    return <div className="Body" style={style}>
      {/* <span>{this.props.body.position.toString()}</span><br/>
      <span>{this.props.body.velocity.toString()}</span><br/>
      <span>{this.props.body.mass}</span> */}
    </div>
  }
}

class World extends React.Component {
  constructor(props) {
    super(props);

    let world = new KineticsWorld();
    world.add(new KineticsBody(new Vector(160, 160), new Vector(0, 0),       6e17, 40));
    world.add(new KineticsBody(new Vector(240, 160), new Vector(-160, -160), 2,    20));
    world.add(new KineticsBody(new Vector(80, 320), new Vector(160, 0),     2,    20));

    this.state = {world};

    this.updateInterval = setInterval(this.update, 10);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    let world = {...this.state.world};
    world.add(new KineticsBody(new Vector(event.clientX, event.clientY), new Vector(Math.random() * 300 - 150, Math.random() * 300 - 150), 2, 20));
    this.setState({world});
  }

  update = () => {
    let updatedWorld = {...this.state.world};
    updatedWorld.update(1);
    this.setState({world: updatedWorld});
  }

  render = () => {
    return (
      <div className="World" onClick={this.handleClick}>
        {this.state.world.bodies.map((body, index) => <Body body={body} key={index}/>)}
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <World/>
    </div>
  );
}

export default App;
