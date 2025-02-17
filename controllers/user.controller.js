export const getUser = async(req, res, next) => {
    try
    {
        res.status(200).json({
            message: `Hello, ${req.params.id}!`
        })
    }
    catch(error)
    {
        next(error);
    }
}
