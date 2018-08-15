import EventEmitter from "../event_emitter";

describe("EventEmitter", () => {
    const myEmitter = new EventEmitter()

    const testE1 = "test"
    const testE2 = "test-2"

    const fun1 = () => console.log("test 1 callback")
    const fun2 = () => console.log("test 2 callback")
    const fun3 = (a, b) => console.log(`test 3 callback: ${a} ${b}`)
    const fun4 = (a, b) => console.log(`test 4 callback: ${a} ${b}`)

    afterEach(() => {
      myEmitter.removeAllListeners(testE1)
      myEmitter.removeAllListeners(testE2)
    })

    describe("on()", () => {

      test("given an event name and function, it registers a function for the named event", () => {
        myEmitter.on(testE1, fun1)
        const actual = myEmitter.listeners(testE1)

        expect(actual).toHaveLength(1)
        expect(actual).toContain(fun1)
      })
    }),

    describe("removeAllListeners()", () => {

      test("it removes all listener functions for a given eventName", () => {
        myEmitter.on(testE1, fun1)
        myEmitter.on(testE1, fun2)
        myEmitter.on(testE1, fun3)
        var actual = myEmitter.listeners(testE1)

        expect(actual).toHaveLength(3)
        myEmitter.removeAllListeners(testE1)

        actual = myEmitter.listeners(testE1)
        expect(actual).toBe(false)
      })

      test("it returns false when given eventName is not registered", () => {
        const actual = myEmitter.removeAllListeners(testE1)
        expect(actual).toBe(false)
      })
    }),

    describe("removeListener()", () => {

      test("given an eventName and listener, it removes the listener", () => {
        myEmitter.on(testE1, fun1)
        var actual = myEmitter.listeners(testE1)
        expect(actual).toContain(fun1)

        myEmitter.removeListener(testE1, fun1)

        var actual2 = myEmitter.listeners(testE1)

        expect(actual2).not.toContain(fun1)
      })

      test("given an eventName and the same listener twice, calling removeLister removes each instance of the function", () => {
        myEmitter.on(testE1, fun1)
        myEmitter.on(testE1, fun1)

        var actual = myEmitter.listeners(testE1)
        expect(actual).toHaveLength(2)

        expect(actual).toContain(fun1)

        myEmitter.removeListener(testE1, fun1)

        var actual2 = myEmitter.listeners(testE1)
        expect(actual2).toHaveLength(0)

        expect(actual2).not.toContain(fun1)
      })

      test("given an eventName and the different listeners, calling removeLister with one of the listeners removes the correct listener", () => {
        myEmitter.on(testE1, fun1)
        myEmitter.on(testE1, fun2)

        var actual = myEmitter.listeners(testE1)
        expect(actual).toHaveLength(2)

        expect(actual).toContain(fun1)
        expect(actual).toContain(fun2)

        myEmitter.removeListener(testE1, fun1)

        var actual2 = myEmitter.listeners(testE1)
        expect(actual2).toHaveLength(1)

        expect(actual).toContain(fun2)
        expect(actual2).not.toContain(fun1)
      })

    })

    describe("callListeners()", () => {
      test("given an array of functions expect each function to be called", () => {
        const callFunctionMock = jest.fn();
        const callFunctionMock2 = jest.fn();

        myEmitter.callListeners([callFunctionMock, callFunctionMock2])

        expect(callFunctionMock).toBeCalled();
        expect(callFunctionMock2).toBeCalled();
      })
    })

    // describe("emit()", () => {}
    // describe("once()", () => {}
})

// describe('<Gallery />', () => {
//   it('Expect sendMessageToParentWindow to be called on image change', () => {
//     const sendEventToParentWindowMock = jest.fn();
//     const onChangeImageMock = jest.fn(() => {
//          sendEventToParentWindowMock();
//     });

//     const gallery = shallow(<Gallery images={imagesMockData} onChange={onChangeImageMock} />); // Passing the mocked onChangeImage as prop
//     gallery.find('input#image-1').simulate('change');

//     expect(sendEventToParentWindowMock).toBeCalled();
//   });
// }