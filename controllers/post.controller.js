

const getPosts = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'All posts retrieved'
    });
}

const addPost = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'Post Created'
    });
}

const deletePost = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: `Post with ID: ${req.params.id} deleted`,
    });
}

const updatePost = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: `Post with ID: ${req.params.id} updated`,
    });
}

const viewPost = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: `Post with ID: ${req.params.id} Viewed`,
    });
}

const getUserPosts = async(req, res, next) => {
    res.status(200).json({
        status: true,
        message: `Posts for User: ${req.params.id} Fetched`,
    });
}

export {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    viewPost,
    getUserPosts
}
