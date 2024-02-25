class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "Resource Not Found"
      }
}

const resourceNotFoundErrorHandler = (err, req, res, next) => {
    if (err instanceof ResourceNotFoundError) {
        console.log(err.name, ": ", err.message)
        return res.status(403).json( {
            error:  err.message
        })
    }
    next()
}

module.exports = { 
    ResourceNotFoundError,
    resourceNotFoundErrorHandler
}