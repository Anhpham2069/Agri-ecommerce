const express = require("express");
const router = express.Router();
const articleController = require("../controller/article");

router.get("/get-all-article", articleController.getAllArticles);
router.post("/create-article", articleController.createArticle);
router.put("/update-article/:id", articleController.updateArticle);
router.delete("/delete-article/:id", articleController.deleteArticle);

module.exports = router;