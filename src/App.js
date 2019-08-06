import React from 'react';
import './App.css';
import { World as KineticsWorld, Body as KineticsBody, Vector } from './kinetics/kinetics';

class Body extends React.Component {
  render = () => <div className="Body" style={{top: this.props.body.position.y + "cm", left: this.props.body.position.x + "cm"}}>
    <span>{this.props.body.position.toString()}</span><br/>
    <span>{this.props.body.velocity.toString()}</span><br/>
    <span>{this.props.body.mass}</span>
  </div>
}

class World extends React.Component {
  constructor(props) {
    super(props);

    let world = new KineticsWorld();
    world.add(new KineticsBody(new Vector(2, 2), new Vector(0, 0), 6e12));
    world.add(new KineticsBody(new Vector(2, 8), new Vector(4, 0), 1));

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
