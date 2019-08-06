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

    this.state = {world, mouseDown: null};

    this.updateInterval = setInterval(this.update, 10);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown = event => {
    let world = {...this.state.world};
    let mouseDown = new Vector(event.clientX, event.clientY);
    this.setState({world, mouseDown});
  }
  
  handleMouseUp = event => {
    if (!this.state.mouseDown) return;
    let state = {...this.state};
    let mouseUp = new Vector(event.clientX, event.clientY);
    let distance = mouseUp.distanceTo(state.mouseDown);
    if (distance > 2) {
      let newBody = new KineticsBody(mouseUp, mouseUp.directionTo(state.mouseDown).scale(distance), 2, 20);
      state.world.add(newBody);
    }
    state.mouseDown = null;
    this.setState({...state});
  }

  update = () => {
    let updatedWorld = {...this.state.world};
    updatedWorld.update(1);
    this.setState({world: updatedWorld});
  }

  render = () => {
    return (
      <div className="World" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
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
