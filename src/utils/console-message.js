/* eslint-disable no-console */
const util = require('util')
const PrettyError = require('pretty-error')

const pe = new PrettyError()

/**
  * @readonly
  * @enum {String} A log type
  */
const messageTypes = {
  warn: 'Warning',
  err: 'Error',
  info: 'Info',
}

Object.freeze(messageTypes)

/**
 * Sets the Error.stackTraceLimit to default or traceLimit
 * https://v8.dev/docs/stack-trace-api
 * @param {number} traceLimit
 * @returns
 */
function setStackTraceLimit(traceLimit = 10) {
  Error.stackTraceLimit = traceLimit
}


/**
 * Create a console log with specified type and message
 *
 * Optionally provide a traceLimit variable to increase the stack trace.
 * @param {messageTypes} messageType One of: err, warn or info
 * @param {String} message
 * @param {Number} traceLimit
 */
function createConsoleLog(messageType = messageTypes.info, message, traceLimit = 0) {
  /* Temporarily set the stacktrace to 0 or traceLimit, in order to only display a message */
  Error.stackTraceLimit = traceLimit
  /* Make room for new message */
  console.log()
  // Create a new empty error
  const newLog = new Error()

  // Make sure the message is a string
  if (typeof message !== 'string') {
    const metaError = new Error()
    metaError.name = 'Meta'
    metaError.message = `Param message needs to be of type: string. Instead, '${typeof message}' was provided.\n
------------------------------------------------\n
\u200b
        The provided ${typeof message}:\n
\u200b
          ${util.inspect(message, true, 8, true)}
\u200b
------------------------------------------------\n
    `
    console.error(pe.render(metaError))
    return
  }

  // Set the new error message
  newLog.message = message

  switch (messageType) {
    case 'warn':
      newLog.name = messageTypes.warn
      console.warn(pe.render(newLog))
      setStackTraceLimit()
      return
    case 'err':
      newLog.name = messageTypes.err
      console.error(pe.render(newLog))
      setStackTraceLimit()
      return
    case 'info':
      newLog.name = messageTypes.info
      console.info(pe.render(newLog))
      setStackTraceLimit()
      return
    default:
      newLog.name = messageTypes.info
      console.info(pe.render(newLog))
      setStackTraceLimit()
  }
}

/* Debugging */
// createConsoleLog('warn', { test: 'object'})
// createConsoleLog('info', 'Testing info messages')

export default createConsoleLog