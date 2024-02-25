class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = "User Unauthenticated"
      }
}

const unauthorizedErrorHandler = (err, req, res, next) => {
    if (err instanceof UnauthorizedError) {
        console.log(err.name, ": ", err.message)
        return res.status(401).json( {
            error:  err.message
        })
    }
    next()
}

module.exports = { 
    UnauthorizedError,
    unauthorizedErrorHandler
}