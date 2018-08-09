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

        this.on = this.on.bind(this)
        this.listeners = this.listeners.bind(this)
    }

    // Methods //

    /**
     * emit()
     * Call to trigger a named event with any number of arguments.
     * @param {string} eventName - The name of the event to trigger
     * @param {[...args]} args - Arguments to supply to the event callback
     *
     * @return {boolean} True if event had listeners, false otherwise.
     *
     * ex: myEmitter.emit('event');
     * ex: myEmitter.emit('event', 'a', 'b');
     */
    emit(eventName, args) { }


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
        if (this._eventMap[eventName]) {
            this._eventMap[eventName].push(listener)
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
    once(eventName, listener) { }


    /**
     * removeListener()
     * removes the supplied "listener" from the named event
     * @param {string} eventName - The name of the event
     * @param {Function} listener - A callback function to be removed
     *
     * ex: myEmitter.removeListener('event', () => {console.log('an event occurred!') });
     */
    removeListener(eventName, listener) { }


    /**
     * removeAllListeners()
     * removes all "listener" from the named event
     * @param {string} eventName - The name of the event
     *
     * ex: myEmitter.removeAllListeners('event')
     */
    removeAllListeners(eventName) { }

    /**
     * listeners()
     * for testing...
     * Returns an array of listeners registered to the named event
     * @param {string} eventName - The name of the event
     * @return {Function[]} - array of listeners registered to the event
     */
    listeners(eventName) {
        return this._eventMap.get(eventName)
    }
}