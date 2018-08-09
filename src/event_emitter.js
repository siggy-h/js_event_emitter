// event emitter class

/**
 * Class representing an event emitter.
 * Event-driven architecture in which certain kinds of objects
 * (called "emitters") emit named events that cause Function objects
 * ("listeners") to be called.
 */
export default class EventEmitter {

    // constructor
    // TODO


    /**
    * emit()
    * call to trigger a named event
    * @param {string} eventName - The name of the event to trigger
    * @param {[...args]} args - Arguments to supply to the event callback
    * @return {boolean} True if event had listeners, false otherwise.
    *
    * ex: myEmitter.emit('event');
    * ex: myEmitter.emit('event', 'a', 'b');
    */
    emit(eventName, args) { }


    /**
    * on()
    * call to register "listeners" to a named event
    * @param {string} eventName - The name of the event to register the listener
    * @param {Function} listener - A callback function
    *
    * ex: myEmitter.on('event', () => {console.log('an event occurred!') });
    */
    on(eventName, listener) { }

    /**
    * once()
    * call to register "listeners" to a named event that will be called at most one time
    * @param {string} eventName - The name of the event to register the listener
    * @param {Function} listener - A callback function
    *
    * ex: myEmitter.on('event', () => {console.log('an event occurred!') });
    */
    once(eventName, listener) { }


    /**
    * removeListener()
    * call to register "listeners" to a named event that will be called at most one time
    * @param {string} eventName - The name of the event to register the listener
    * @param {Function} listener - A callback function
    *
    * ex: myEmitter.on('event', () => {console.log('an event occurred!') });
    */
    removeListener(eventName, listener) { }
}