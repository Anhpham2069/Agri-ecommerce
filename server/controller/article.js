const Article = require("../models/article");

class ArticleController {
  async getAllArticles(req, res) {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while fetching articles" });
    }
  }

  async createArticle(req, res) {
    try {
      const { title, content } = req.body;
      const article = new Article({ title, content });
      await article.save();
      res.json(article);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create the article" });
    }
  }

  async updateArticle(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      // Kiểm tra quyền admin ở đây (ví dụ: sử dụng middleware)

      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      article.title = title;
      article.content = content;
      await article.save();

      res.json(article);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to update the article" });
    }
  }

  async deleteArticle(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra quyền admin ở đây (ví dụ: sử dụng middleware)

      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      await article.remove();

      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to delete the article" });
    }
  }
}

module.exports = new ArticleController();