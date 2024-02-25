class InsufficientDataError extends Error {
    constructor(message) {
        super(message)
        this.name = "Insufficient Data"
      }
}
const insufficientDataErrorHandler = (err, req, res, next) => {
    if (err instanceof InsufficientDataError) {
        console.log(err.name, ": ", err.message)
        return res.status(400).json( {
            error: err.message
        })
    }
    next()
}

module.exports = { 
    InsufficientDataError,
    insufficientDataErrorHandler
}