const getUser = async(req, res, next) => {
    try
    {
        const userData = req.user;
        res.status(200).json({
            status: true,
            data: {
                user: userData
            }
        })
    }
    catch(error)
    {
        next(error);
    }
}

export {
    getUser
}
