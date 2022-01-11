const router = require("express").Router();
const UserController = require('../controllers/UsersController');

router.get("/", UserController.index);
router.post("/", UserController.store);
router.get('/:id', UserController.edit);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;