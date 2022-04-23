const router = require('express').Router();
const commentController = require('../controllers/commentController');

const isAuth = require('../middleware/isAuth');

// ID do *post* que queremos comentar.
router.post('/:id/new', isAuth, commentController.createComment);

// ID do *comentário*.
router.delete('/:id', isAuth, commentController.deleteComment);

module.exports = router;