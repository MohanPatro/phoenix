exports.response=(status, data, message)=> {
    return ({ 'status': status, 'data': data, 'message': message });
}
exports.handleError=(res, error)=> {
    console.error(error);
    return res.status(500).json(base_response(false, {}, error.message));
}