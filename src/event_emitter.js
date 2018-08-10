/**
 * EventEmitter
 * Class representing an event emitter.
 * Event-driven architecture in which certain kinds of objects
 * (called "emitters") emit named events that cause Function objects
 * ("listeners") to be called.
 */
export default class EventEmitter {
    _eventMap

    constructor() {
        this._eventMap = new Map()   // "eventName" -> Function[]

        this.emit = this.emit.bind(this)
        this.callListeners = this.callListeners.bind(this)
        this.on = this.on.bind(this)
        this.once = this.once.bind(this)
        this.removeListener = this.removeListener.bind(this)
        this.removeAllListeners = this.removeAllListeners.bind(this)
        this.listeners = this.listeners.bind(this)
    }

    // Methods //

    /**
     * emit()
     * Call to trigger a named event with any number of arguments.
     * @param {string} eventName - The name of the event to trigger
     * @param {[...args]} args - Optional arguments to supply all listeners registered to an event
     *
     * @return {boolean} True if event had listeners, false otherwise.
     *
     * ex: myEmitter.emit('event');
     * ex: myEmitter.emit('event', 'a', 'b');
     */
    emit(eventName, ...args) {
        const listeners = this._eventMap.get(eventName)
        if (listeners) {
            this.callListeners(listeners, ...args)
            return true
        } else {
            return false
        }
    }

    /**
     * callListeners()
     * helper function to call each listener asynchronously
     * @param {Function[]} listeners - array of listener functions
     * @param {[...args]} args - Optional arguments to pass into all listener functions
     */
    async callListeners(listeners, ...args) {
        listeners.map(async fun => fun(...args))
    }

    /**
     * on()
     * Call to register "listener" to a named event.
     * @param {string} eventName - The name of the event to register the listener
     * @param {Function} listener - A callback function
     *
     * ex: myEmitter.on('event', () => {
     *       console.log('an event occurred!')
     *     });
     */
    on(eventName, listener) {
        if (this._eventMap.get(eventName)) {
            this._eventMap.set(eventName, [...this._eventMap.get(eventName), listener])
        } else {
            this._eventMap.set(eventName, [listener])
        }
    }

    /**
     * once()
     * Call to register "listener" to a named event.
     * The "listener" will be called, at most, one time.
     * @param {string} eventName - The name of the event to register the listener
     * @param {Function} listener - A callback function
     *
     * ex: myEmitter.on('event', () => {console.log('an event occurred!') });
     */
    once(eventName, listener) {

        const onceListener = (...args) => {
            // remove this function from registered list
            this.removeListener(eventName, onceListener)
            // call actual listener
            listener(...args)
        }

        // register the listener using the onceListener() wrapper
        this.on(eventName, onceListener)
    }

    /**
     * removeListener()
     * removes the supplied "listener" from the named event
     * @param {string} eventName - The name of the event
     * @param {Function} listener - A callback function to be removed
     *
     * ex: myEmitter.removeListener('event', () => {console.log('an event occurred!') });
     */
    removeListener(eventName, listener) {
        const listeners = this._eventMap.get(eventName)
        if (listeners) {
            this._eventMap.set(eventName, listeners.filter((elm) => elm !== listener))
        }
    }

    /**
     * removeAllListeners()
     * removes all "listener" from the named event
     * @param {string} eventName - The name of the event
     * @return {boolean} - returns true if removed, false if event name is not registered
     *
     * ex: myEmitter.removeAllListeners('event')
     */
    removeAllListeners(eventName) {
        return this._eventMap.delete(eventName)
    }

    /**
     * listeners()
     * for testing...
     * Returns an array of listeners registered to the named event
     * @param {string} eventName - The name of the event
     * @return {Function[] | false} - array of listeners registered to the event, or false if event does is not registered
     */
    listeners(eventName) {
        var listeners = this._eventMap.get(eventName)
        return !!listeners ? listeners : false
    }
}