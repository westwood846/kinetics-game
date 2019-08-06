import React from 'react';
import './App.css';
import { World as KineticsWorld, Body as KineticsBody, Vector } from './kinetics/kinetics';

class Body extends React.Component {
  render = () => {
    let style = {
      top: this.props.body.position.y - this.props.body.size/2 + "mm", 
      left: this.props.body.position.x - this.props.body.size/2 + "mm",
      width: this.props.body.size + "mm",
      height: this.props.body.size + "mm",
    }
    return <div className="Body" style={style}>
      <span>{this.props.body.position.toString()}</span><br/>
      <span>{this.props.body.velocity.toString()}</span><br/>
      <span>{this.props.body.mass}</span>
    </div>
  }
}

class World extends React.Component {
  constructor(props) {
    super(props);

    let world = new KineticsWorld();
    world.add(new KineticsBody(new Vector(40, 40), new Vector(0, 0),  6e15, 10));
    world.add(new KineticsBody(new Vector(60, 40), new Vector(-40, -80),  1,    5));
    world.add(new KineticsBody(new Vector(20, 80), new Vector(40, 0), 1,    5));

    this.state = {world};

    this.updateInterval = setInterval(this.update, 10);
  }

  update = () => {
    let updatedWorld = {...this.state.world};
    updatedWorld.update(1);
    this.setState({world: updatedWorld});
  }

  render = () => {
    console.log(this.state.world.bodies)
    return (
      <div className="World">
        {this.state.world.bodies.map(body => <Body body={body}/>)}
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
