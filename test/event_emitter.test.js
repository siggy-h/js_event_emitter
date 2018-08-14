import EventEmitter from "../src/event_emitter";

describe("EventEmitter", () => {
  var myEmitter = new EventEmitter()

  var fun1 = () => console.log("test 1 callback")
  var fun2 = () => console.log("test 2 callback")
  var fun3 = (a, b) => console.log(`test 3 callback: ${a} ${b}`)
  var fun4 = (a, b) => console.log(`test 4 callback: ${a} ${b}`)

  afterEach(() => {
    myEmitter.removeAllListeners()
  })

  // emit
  // callListeners
  // on
  // once
  // removeListener
  // removeAllListeners
  // listeners

  test("on", () => {
    myEmitter.on("test", fun1)
    const actual = myEmitter.listeners("test")
    const expected = fun1

    expect(actual).toHaveLength(1)
    expect(actual).toContain(expected)
  })
})

