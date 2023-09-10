import { getUser, getAll, updateUser, deleteUser, getUserFriends, followUser, unfollowUser, getBookmarkedPosts, getLikedPosts } from '../controllers/userController.js'
import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
const userRouter = express.Router()

userRouter.get('/findAll', getAll)
userRouter.get('/find/:id', getUser)
userRouter.get('/find/friends/:id', getUserFriends)
userRouter.get('/bookmarks', verifyToken, getBookmarkedPosts)
userRouter.get('/likes', verifyToken, getLikedPosts)

userRouter.put('/update/:id', verifyToken, updateUser)
userRouter.put('/follow/:id', verifyToken, followUser)
userRouter.put('/unfollow/:id', verifyToken, unfollowUser)

userRouter.delete('delete/:id', verifyToken, deleteUser)

export default userRouter