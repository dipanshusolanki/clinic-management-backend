import {Router} from "express";
import {addPost, deletePost, getPosts, getUserPosts, updatePost, viewPost} from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.get('/', getPosts); // Both All Posts or Searched Posts

postRouter.post('/', authMiddleware, addPost)

postRouter.delete('/:id', authMiddleware, deletePost);

postRouter.put('/:id', authMiddleware, updatePost);

postRouter.get('/:id', viewPost);

postRouter.get('/user/:id', authMiddleware, getUserPosts);


export default postRouter;
