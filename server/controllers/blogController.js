import Blog from "../models/Blog.js";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      category,
      image,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find()
      .populate("author", "name email")
      .populate("comments.user", "name");

    res.status(200).json(blogs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Single Blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email avatar");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.image = image || blog.image;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get Logged In User Blogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const alreadyLiked = blog.likes.includes(req.user.id);

    if (alreadyLiked) {
      blog.likes.pull(req.user.id);
    } else {
      blog.likes.push(req.user.id);
    }

    await blog.save();

    res.status(200).json({
      success: true,
      likes: blog.likes.length,
      liked: !alreadyLiked,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {

    const { text } = req.body;

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        blog.comments.push({

            user: req.user.id,
            username: req.user.name,
            text

        });

        await blog.save();

        res.status(201).json(blog.comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
export const deleteComment = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.blogId);

        const comment = blog.comments.id(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user.id) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        comment.deleteOne();

        await blog.save();

        res.json({
            message: "Comment deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};