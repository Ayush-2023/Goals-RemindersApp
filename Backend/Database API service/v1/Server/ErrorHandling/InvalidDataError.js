class InvalidDataError extends Error {
    constructor(message) {
        super(message)
        this.name = "Invalid Data"
      }
}

const invalidDataErrorHandler = (err, req, res, next) => {
    if (err instanceof InvalidDataError) {
        console.log(err.name, ": ", err.message)
        return res.status(400).json( {
            error: err.message
        })
    }
    next()
}

module.exports = { 
    InvalidDataError,
    invalidDataErrorHandler
}