(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,o,i){},16:function(t,o,i){},17:function(t,o,i){"use strict";i.r(o);var n=i(0),e=i.n(n),s=i(8),a=i.n(s),r=(i(15),i(3)),c=i(2),d=i(1),l=i(5),u=i(4),h=i(6),p=(i(16),function t(o,i){var n=this;Object(d.a)(this,t),this.distanceTo=function(t){return Math.sqrt(Math.abs(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)))},this.directionTo=function(o){var i=n.distanceTo(o);return i>0?new t((o.x-n.x)/i,(o.y-n.y)/i):new t(0,0)},this.add=function(o){return new t(n.x+o.x,n.y+o.y)},this.sub=function(o){return new t(n.x-o.x,n.y-o.y)},this.scale=function(o){return new t(n.x*o,n.y*o)},this.dotProductWith=function(t){return n.x*t.x+n.y*t.y},this.toString=function(){return"[".concat(n.x.toPrecision(3),", ").concat(n.y.toPrecision(3),"]")},this.x=o,this.y=i}),w=function t(o,i,n){var e=this,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;Object(d.a)(this,t),this.forceWith=function(t){return 6.674e-11*e.mass*t.mass/Math.pow(e.position.distanceTo(t.position),2)},this.accelerationTowards=function(t){return e.mass>0&&e.position.distanceTo(t.position)>0?e.forceWith(t)/e.mass:0},this.updateVelocityWith=function(t,o){var i=e.position.directionTo(t.position),n=e.accelerationTowards(t),s=i.scale(n).scale(o/1e3);e.velocity=e.velocity.add(s)},this.updatePosition=function(t){return e.position=e.position.add(e.velocity.scale(t/1e3))},this.toString=function(){return"pos: ".concat(e.position,", vel: ").concat(e.velocity,", m: ").concat(e.mass.toPrecision(3))},this.position=o,this.velocity=i,this.mass=n,this.size=s},y=function t(o,i){var n=this;Object(d.a)(this,t),this.add=function(t){return n.bodies.push(t)},this.update=function(t){var o=!0,i=!1,e=void 0;try{for(var s,a=n.bodies[Symbol.iterator]();!(o=(s=a.next()).done);o=!0){var r=s.value,c=!0,d=!1,l=void 0;try{for(var u,h=n.bodies[Symbol.iterator]();!(c=(u=h.next()).done);c=!0){var p=u.value;r!==p&&(r.updateVelocityWith(p,t),r.updatePosition(t),r.position.distanceTo(p.position)<=r.size/2+p.size/2&&(r.velocity=r.velocity.sub(r.position.sub(p.position).scale(2*p.mass/(r.mass+p.mass)).scale(r.velocity.sub(p.velocity).dotProductWith(r.position.sub(p.position))/Math.pow(r.position.distanceTo(p.position),2)))))}}catch(w){d=!0,l=w}finally{try{c||null==h.return||h.return()}finally{if(d)throw l}}n.width&&n.height&&(r.position.x-r.size/2<=0&&(r.velocity.x=-1*r.velocity.x,r.position.x=r.position.x-r.position.x+r.size/2+1,r.velocity=r.velocity.scale(.8)),r.position.y-r.size/2<=0&&(r.velocity.y=-1*r.velocity.y,r.position.y=r.position.y-r.position.y+r.size/2+1,r.velocity=r.velocity.scale(.8)),r.position.x+r.size/2>=n.width&&(r.velocity.x=-1*r.velocity.x,r.position.x=r.position.x+n.width-r.position.x-r.size/2-1,r.velocity=r.velocity.scale(.8)),r.position.y+r.size/2>=n.height&&(r.velocity.y=-1*r.velocity.y,r.position.y=r.position.y+n.height-r.position.y-r.size/2-1,r.velocity=r.velocity.scale(.8)))}}catch(w){i=!0,e=w}finally{try{o||null==a.return||a.return()}finally{if(i)throw e}}},this.toString=function(){return n.bodies.join("\n")},this.bodies=[],this.width=o,this.height=i},v=function(t){function o(){var t,i;Object(d.a)(this,o);for(var n=arguments.length,s=new Array(n),a=0;a<n;a++)s[a]=arguments[a];return(i=Object(l.a)(this,(t=Object(u.a)(o)).call.apply(t,[this].concat(s)))).render=function(){var t={top:i.props.body.position.y-i.props.body.size/2+"px",left:i.props.body.position.x-i.props.body.size/2+"px",width:i.props.body.size+"px",height:i.props.body.size+"px"};return e.a.createElement("div",{className:"Body",style:t})},i}return Object(h.a)(o,t),o}(e.a.Component),f=function(t){function o(t){var i;Object(d.a)(this,o),(i=Object(l.a)(this,Object(u.a)(o).call(this,t))).handleMouseDown=function(t){var o=Object(r.a)({},i.state.world),n=new p(t.clientX,t.clientY);i.setState({world:o,mouseDown:n})},i.handleMouseUp=function(t){if(i.state.mouseDown){var o=Object(r.a)({},i.state),n=new p(t.clientX,t.clientY),e=n.distanceTo(o.mouseDown),s=null;s=new w(n,e>0?n.directionTo(o.mouseDown).scale(e):new p(0,0),2,20),o.world.add(s),o.mouseDown=null,i.setState(Object(r.a)({},o))}},i.update=function(){var t=new y(window.innerWidth,window.innerHeight);t.bodies=i.state.world.bodies.slice(),t.update(1),i.setState({world:t})},i.render=function(){return e.a.createElement("div",{className:"World",onMouseDown:i.handleMouseDown,onMouseUp:i.handleMouseUp},i.state.world.bodies.map(function(t,o){return e.a.createElement(v,{body:t,key:o})}))};var n=new y(window.innerWidth,window.innerHeight);n.add(new w(new p(window.innerWidth/2-20,window.innerHeight/2-20),new p(0,0),6e17,40));for(var s=0;s<5;s++)n.add(new w(new p(Math.random()*(window.innerWidth-10),Math.random()*(window.innerHeight-10)),new p((200*Math.random()+200)*(Math.random()>.5?-1:1),(200*Math.random()+200)*(Math.random()>.5?-1:1)),2,20));return i.state={world:n,mouseDown:null},i.updateInterval=setInterval(i.update,10),i.handleMouseDown=i.handleMouseDown.bind(Object(c.a)(i)),i.handleMouseUp=i.handleMouseUp.bind(Object(c.a)(i)),i}return Object(h.a)(o,t),o}(e.a.Component);var b=function(){return e.a.createElement("div",{className:"App"},e.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(e.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},9:function(t,o,i){t.exports=i(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.e3003c78.chunk.js.map