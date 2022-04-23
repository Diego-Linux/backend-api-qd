const router = require('express').Router();
const postController = require('../controllers/postController');

const upload = require("../utils/multer");
const isAuth = require('../middleware/isAuth');
const { validPost } = require('../middleware/validation');

// Rota de relatório dos posts.
router.get('/', isAuth, postController.getPosts);


router.post('/new', upload.single("image"), validPost, isAuth, postController.createPost);

router.get('/:id', isAuth, postController.postDetails);

router.get('/history/:id', isAuth, postController.getHistoryPost);

router.patch('/:id', isAuth, postController.editPost);

router.patch('/:id/like', isAuth, postController.likePost);

router.patch('/:id/dislike', isAuth, postController.dislikePost);

router.delete('/:id', isAuth, postController.deletePost);

module.exports = router;