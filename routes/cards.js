const router = require("express").Router();
const {
  createCard,
  getCards,
  deleteCardUserById,
} = require("../controllers/cards");


router.post("/", createCard);
router.get("/", getCards);
router.delete('/:cardId', deleteCardUserById);


module.exports = router;
