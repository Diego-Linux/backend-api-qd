const Post = require('../models/Post');
const Comment = require('../models/Comment');
const historyPost = require('../models/historyPost');
const Cloudinary = require("../utils/cloudinary");

// Criação do post
exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        let uploadImg = "";

        if (req.file) {
            // Fazendo upload da imagem no cloudinary
            uploadImg = await Cloudinary.uploader.upload(req.file.path);
        }

        const post = new Post({
            title: title,
            description: description,
            image: uploadImg.secure_url,
            user: req.user._id
        });

        await post.save();

        res.status(200).json({ post });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Listar título de cada post, *quantidade* de visualizações e também a
// *quantidade* de likes/dislikes e comentários de cada post
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $project: {
                    title: 1,
                    likes: { $size: "$likes" },
                    dislikes: { $size: "$dislikes" },
                    comments: { $size: "$comments" },
                    views: 1,
                    image: 1
                }
            }
        ]);

        // await Post.updateMany({ $inc: { views: 1 } });

        res.status(200).json({ posts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// Detalhes do post e também adicionando + 1 visualização
exports.postDetails = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId)
            .populate("user likes dislikes", "name")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name"
                }
            })

        if (!post) return res.status(400).json({ error: 'Nenhum post encontrado.' });

        // Somando +1 visualização
        await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });

        res.status(200).json({
            post,
            'likes': post.likes.length,
            'dislikes': post.dislikes.length,
            'comments': post.comments.length,
            'views': post.views
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Editar post(somente o criador do post tem permissão).
// Aqui também salvamos o histórico de edição do post.
exports.editPost = async (req, res) => {
    try {
        const currentPost = await Post.findById(req.params.id);

        const { title, user, description, image, _id } = currentPost;

        // Salvando o post atual antes de dar update.
        await historyPost.create({
            title, user, description, image, originalPost: _id
        });

        // Fazendo o update.
        const post = await Post.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id
        }, { title: req.body.title, description: req.body.description })

        if (!post) {
            return res.status(400).json({ error: 'Ops, algo deu errado.' });
        }

        res.status(200).json({ message: 'Post editado!' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Deletar post(somente o criador do post tem permissão).
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
            _id: req.params.id, user: req.user._id
        });

        if (!post) {
            return res.status(400).json({ error: 'Ops, algo deu errado.' });
        }
        // Aqui deletaremos todos os comentários relacionados a este post.
        await Comment.deleteMany({ _id: { $in: post.comments } })

        res.status(200).json({ message: 'Post deletado com sucesso.' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Adicionar/remover like
// fiz algumas checagens para não ter mais de 1 like do mesmo usuário em um post,
//e para que também não tenha 1 like e 1 dislike do mesmo usuário.
exports.likePost = async (req, res) => {
    try {
        const checkLike = await Post.find({ _id: req.params.id, likes: req.user._id });

        if (checkLike.length > 0) {
            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id }
            }, { new: true });

            return res.status(200).json({ message: 'Like removido.' })
        }
        else {
            const like = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { dislikes: req.user._id },
                $push: { likes: req.user._id }
            }, { new: true });

            if (!like) return res.status(400).json({ message: 'Este post não existe.' });

            return res.status(200).json({ message: 'Like adicionado!' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Opção de "não gostei" (dislike).
exports.dislikePost = async (req, res) => {
    try {
        const check = await Post.find({ _id: req.params.id, dislikes: req.user._id });

        if (check.length > 0) {
            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { dislikes: req.user._id }
            }, { new: true });

            return res.status(200).json({ message: 'Dislike removido.' })
        }
        else {
            const like = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id },
                $push: { dislikes: req.user._id }
            }, { new: true });

            if (!like) return res.status(400).json({ message: 'Este post não existe.' });

            return res.status(200).json({ message: 'Dislike adicionado!' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

// Exibir histórico de edição do post.
exports.getHistoryPost = async (req, res) => {
    try {
        // Histórico de updates, do mais recente para o mais antigo.
        const getHistory = await historyPost.find({ originalPost: req.params.id })
            .find().sort({ createdAt: -1 });

        if (!getHistory) return res.status(400).json({ error: 'Ops, algo deu errado.' });

        res.status(200).json({ getHistory });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};