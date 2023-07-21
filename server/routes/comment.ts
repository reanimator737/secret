import { Router } from 'express';
import { commentController } from '../controller/comment';
//@ts-ignore
const comments = new Router();
comments.get('/comments/:postId', commentController.getAllCommentsFromPost);
comments.delete('/comments', commentController.removeComment);
comments.post('/comments', commentController.addComment);
comments.patch('/comments/like', commentController.addLike);
comments.delete('/comments/reaction', commentController.removeReaction);
comments.patch('/comments/dislike', commentController.addDislike);
comments.patch('/comments/ownerLike', commentController.addOwnerLike);
comments.patch('/comments/ownerLike/remove', commentController.removeOwnerLike);

export default comments;
