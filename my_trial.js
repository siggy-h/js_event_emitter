import EventEmitter from "./src/event_emitter"

var myEmitter = new EventEmitter()

console.log("*** Hey, this is your trial program... ")


myEmitter.on("test", () => console.log("test callback"))

console.log( myEmitter.listeners("test").toString() )