const setResponseType = (req, res, next) => {
    res.type = "json"
    next()
}

module.exports = {
    setResponseType
}