class ForbiddenAccessError extends Error {
    constructor(message) {
        super(message)
        this.name = "Forbidden Access"
      }
}

const forbiddenAccessErrorhandler = (err, req, res, next) => {
    if (err instanceof ForbiddenAccessError) {
        console.log(err.name, ": ", err.message)
        return res.status(403).json( {
            error:  err.message
        })
    }
    next()
}

module.exports = { 
    ForbiddenAccessError,
    forbiddenAccessErrorhandler
}