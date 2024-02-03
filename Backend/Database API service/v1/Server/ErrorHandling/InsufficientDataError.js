class InsufficientDataError extends Error {
    constructor(message) {
        super(message)
        this.name = "InsufficientData"
      }
}

module.exports = { 
    InsufficientDataError
}