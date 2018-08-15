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

      test("given an event name and listener, it registers a listener for the named event", () => {
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
        const callFunctionMock = jest.fn(fun1);
        const callFunctionMock2 = jest.fn(fun2);

        myEmitter.callListeners([callFunctionMock, callFunctionMock2])

        expect(callFunctionMock).toBeCalled();
        expect(callFunctionMock2).toBeCalled();
      })
    })

    describe("emit()", () => {
        test("given a registered namedEvent, expect emit to return true", () => {
          const callFunctionMock = jest.fn(fun1);
          myEmitter.on(testE1, callFunctionMock)
          const result = myEmitter.emit(testE1)
          expect(result).toBe(true);
        })

        test("given an unregistered namedEvent, expect emit to return false", () => {
          const result = myEmitter.emit(testE1)
          expect(result).toBe(false);
        })

        test("given a registered listener w/no-args, expect listener to have been called", () => {
          const callFunctionMock = jest.fn(fun2);
          myEmitter.on(testE1, callFunctionMock)
          myEmitter.emit(testE1)
          expect(callFunctionMock).toBeCalled();
        })

        test("given a registered listener with args, expect emit() to have called listener with args", () => {
          const callFunctionMock = jest.fn(fun3)
          const args = [0,1]
          myEmitter.on(testE1, callFunctionMock)
          myEmitter.emit(testE1, ...args)
          expect(callFunctionMock).toBeCalled()
          expect(callFunctionMock.mock.calls.length).toBe(1)
          // The first argument of the first call to the function
          expect(callFunctionMock.mock.calls[0][0]).toEqual(...args)
        })

        test("given a registered namedEvent with multiple listeners no-args, expect emit() to have called each listener", () => {
          const callFunctionMock = jest.fn()
          const callFunctionMock2 = jest.fn()
          myEmitter.on(testE1, callFunctionMock)
          myEmitter.on(testE1, callFunctionMock2)

          myEmitter.emit(testE1)
          expect(callFunctionMock).toBeCalled()
          expect(callFunctionMock2).toBeCalled()
        })

        test("given a registered namedEvent with multiple listeners w/ args, expect emit() to have called each listener with given args", () => {
          const callFunctionMock = jest.fn(fun3)
          const callFunctionMock2 = jest.fn(fun4)
          const args = [3,4]
          myEmitter.on(testE1, callFunctionMock)
          myEmitter.on(testE1, callFunctionMock2)

          myEmitter.emit(testE1, ...args)
          expect(callFunctionMock).toBeCalled();
          expect(callFunctionMock2).toBeCalled();

          expect(callFunctionMock.mock.calls.length).toBe(1)
          expect(callFunctionMock.mock.calls[0][0]).toEqual(...args)

          expect(callFunctionMock2.mock.calls.length).toBe(1)
          expect(callFunctionMock2.mock.calls[0][0]).toEqual(...args)
        })

        test("calling emit() with a namedEvent does call listeners of other events", () => {
          const callFunctionMock = jest.fn(fun1)
          const callFunctionMock2 = jest.fn(fun2)
          myEmitter.on(testE1, callFunctionMock)
          myEmitter.on(testE2, callFunctionMock2)

          myEmitter.emit(testE1)
          expect(callFunctionMock).toBeCalled();
          expect(callFunctionMock2).not.toBeCalled();
        })
    })

    describe("once()", () => {
      test('a listener registered with once(), is only called once on emit()', () => {
        const callFunctionMock = jest.fn(fun1)
        myEmitter.once(testE1, callFunctionMock)

        myEmitter.emit(testE1)
        expect(callFunctionMock).toBeCalled()
        expect(callFunctionMock.mock.calls.length).toBe(1)
      })

      test('a listener registered with once(), is not registered after emit() has been called', () => {
        const callFunctionMock = jest.fn(fun1)
        myEmitter.once(testE1, callFunctionMock)

        const actual = myEmitter.listeners(testE1)

        expect(actual).toHaveLength(1)

        myEmitter.emit(testE1)
        expect(callFunctionMock).toBeCalled()
        expect(callFunctionMock.mock.calls.length).toBe(1)

        const actual2 = myEmitter.listeners(testE1)

        expect(actual2).toHaveLength(0)
        expect(actual2).not.toContain(fun1)
      })
    })
})