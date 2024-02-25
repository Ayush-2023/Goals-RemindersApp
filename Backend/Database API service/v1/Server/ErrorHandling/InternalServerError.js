class InternalServerError extends Error {
    constructor(message) {
        super(message)
        this.name = "Internal Server Error"
      }
}
const internalServerErrorHandler = (err, req, res, next) => {
    if (err instanceof InternalServerError) {
        console.log(err.name, ": ", err.message)
        return res.status(500).json( {
            error: err.message
        })
    }
    next()
}

module.exports = { 
    InternalServerError,
    internalServerErrorHandler
}