// Takes a cb funcion and its param.
// 3rd variable is the init function from indexjs
const exitHandler = async (cb, param, init) => {
    const restart = param ? await cb(param) : await cb()
    restart ? init()
        : (console.log("Goodbye!"), process.exit())
    return
}

module.exports = exitHandler;