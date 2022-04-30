const respondPayload = (payload) => {
    return { success: true, payload };
}

const respondError = (errorMessage) => {
    return { success: false, message: errorMessage };
}

const respondInvalidRequest = (req, res) => {
    res.status(400).json(respondError("Invalid request"));
}

module.exports = {
    respondPayload,
    respondError,
    respondInvalidRequest
};
