const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const transporter = require('../utils/nodemailer');
const { newCommentTemplate } = require('../utils/emailTemplate');

exports.createComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const { content } = req.body;

        const findPost = await Post.findById(postId);

        const postUserId = findPost.user;

        if (!findPost) return res.status(400).json({ error: 'Post não encontrado.' });

        const newComment = new Comment({
            user: req.user._id, content, postId, postUserId
        });

        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { comments: newComment._id }
        }, { new: true })

        await newComment.save();

        res.status(200).json({ newComment })

        // abaixo está o envio de e-mail notificando o criador do post sobre o novo comentário.
        const userPost = await User.findById(postUserId);

        const data = await newCommentTemplate(userPost.email, req.user.name, content);

        await transporter.sendMail(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Editar comentário(somente o dono do comentário tem permissão).
exports.editComment = async (req, res) => {
    try {
        const { content } = req.body;

        const comment = await Comment.findOneAndUpdate({
            _id: req.params.id, user: req.user._id
        }, { content });

        if (!comment) return res.status(400).json({ error: 'Ops, algo deu errado.' });

        res.status(200).json({ message: 'Comentário editado!' })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Deletar comentário(possivel apenas para o criador do post ou do próprio comentário).
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            $or: [
                { user: req.user._id },
                { postUserId: req.user._id }
            ]
        });

        if (!comment) return res.status(400).json({ error: 'Ops, algo deu errado.' });

        await Post.findOneAndUpdate({ _id: comment.postId }, {
            $pull: { comments: req.params.id }
        });

        res.status(200).json({ message: `Comentário deletado por ${req.user.name}.` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
