import User from '../models/User.js'
import Post from '../models/Post.js'

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const userPosts = await Post.find({ userId: req.params.id, hidden: false })
        return res.status(200).json(userPosts)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const createPost = async (req, res) => {
    try {
        const isEmpty = Object.values(req.body).some(v => v === '')
        if (isEmpty) {
            throw new Error("All fields are required!")
        }

        const post = await Post.create({ ...req.body, userId: req.user.id })
        return res.status(201).json(post)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.user.id) {
            const updatePost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json(updatePost)
        } else {
            throw new Error("Only the owner of this post is allowed to do that")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            throw new Error("No such post")
        }
        if (post.userId === req.user.id) {
            await post.deleteOne()
            return res.status(200).json({ msg: "Post deleted!" })
        } else {
            throw new Error('Only the owner of this post is allowed to do that')
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            throw new Error("No such post");
        }
        const isLikedByCurrUser = post.likes.includes(req.user.id)
        if (isLikedByCurrUser) {
            throw new Error("Can't like a post two times 🙂")
        } else {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $push: { likes: req.user.id } },
                { new: true }
            )
            return res.status(200).json({ msg: "Post liked 🎉" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            throw new Error("No such post");
        }
        const isLikedByCurrUser = post.likes.includes(req.user.id)
        if (isLikedByCurrUser) {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $pull: { likes: req.user.id } },
                { new: true }
            )
            return res.status(200).json({ msg: "Post unliked!" })
        } else {
            throw new Error("You can only dislike posts you've already liked!")
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getTimelinePosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        const allPosts = userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt)
        return res.json(allPosts)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const hidePost = async (req, res) => {
    const postId = req.params.postId
    const userId = req.user.id
    try {
        const post = await Post.findById(postId)
        if (!post) {
            throw new Error("No such post!")
        }
        if (post.userId !== userId) {
            throw new Error('Not authorized')
        }
        await Post.findByIdAndUpdate(postId, { hidden: true })
        return res.status(200).json({ msg: "Post hidden!" })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const unhidePost = async (req, res) => {
    const postId = req.params.postId
    const userId = req.user.id
    try {
        const post = await Post.findById(postId)
        if (!post) {
            throw new Error("No such post!")
        }
        if (post.userId !== userId) {
            throw new Error('Not authorized')
        }
        await Post.findByIdAndUpdate(postId, { hidden: false })
        return res.status(200).json({ msg: "Post unhidden!" })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}