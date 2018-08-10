import EventEmitter from "./src/event_emitter"

var myEmitter = new EventEmitter()

var fun1 = () => console.log("test 1 callback")
var fun2 = () => console.log("test 2 callback")
var fun3 = (a, b) => console.log(`test 3 callback: ${a} ${b}`)
var fun4 = (a, b) => console.log(`test 4 callback: ${a} ${b}`)

console.log("\n*** Hey, this is your unofficial \"test\" program... ***\n")

// on()
console.log("* registering a function to \"test\"")
myEmitter.on("test", fun1)
console.log( myEmitter.listeners("test").toString() )

console.log("* registering another function to \"test\"")
myEmitter.on("test", fun2)
console.log( myEmitter.listeners("test").toString() )

console.log("\n* output of unregistered event")
console.log( myEmitter.listeners("fake").toString() )

// removeListener()
console.log("\n* remove fun1 from \"test\"")
myEmitter.removeListener("test", fun1)
console.log( myEmitter.listeners("test").toString() )

// removeAllListeners
console.log("\n* Remove all for \"test\"")
console.log(myEmitter.removeAllListeners("test"))
console.log( myEmitter.listeners("test").toString() )

console.log("\n* Remove already removed \"test\"")
console.log(myEmitter.removeAllListeners("test"))


// callListeners()
console.log("\n** testing, callListeners()")
const funGrp = [fun1, fun2, fun3]
myEmitter.callListeners(funGrp)

// emit()
myEmitter.on("test-args", fun3)
myEmitter.on("test-args", fun4)
console.log("\nEmitting:")
myEmitter.emit("test-args",  "x", "y")

myEmitter.on("test", fun1)
myEmitter.on("test", fun2)
console.log("\nEmitting:")
myEmitter.emit("test")

myEmitter.removeAllListeners()

// once()
myEmitter.once("test-once", fun1)
console.log("\nEmitting:")
myEmitter.emit("test-once")
console.log("\nEmitting: again")
myEmitter.emit("test-once")
