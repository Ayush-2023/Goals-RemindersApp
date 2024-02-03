class ForbiddenAccessError extends Error {
    constructor(message) {
        super(message)
        this.name = "ForbiddenAccess"
      }
}

module.exports = { 
    ForbiddenAccessError
}