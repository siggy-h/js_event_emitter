import EventEmitter from "./src/event_emitter"

var myEmitter = new EventEmitter()

var fun1 = () => console.log("test 1 callback")
var fun2 = () => console.log("test 2 callback")

console.log("\n*** Hey, this is your unofficial \"test\" program... \n\n")

// on()
console.log("* registering a function to \"test\"")
myEmitter.on("test", fun1)
console.log( myEmitter.listeners("test").toString() )

console.log("* registering another function to \"test\"")
myEmitter.on("test", fun2)
console.log( myEmitter.listeners("test").toString() )

console.log("* output of unregistered event")
console.log( myEmitter.listeners("fake").toString() )

// removeListener()
console.log("* remove fun1 from \"test\"")
myEmitter.removeListener("test", fun1)
console.log( myEmitter.listeners("test").toString() )

// removeAllListeners
console.log("* Remove all for \"test\"")
myEmitter.removeAllListeners("test")
console.log( myEmitter.listeners("test").toString() )
