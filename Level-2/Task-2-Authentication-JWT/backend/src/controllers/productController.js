const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productController = {
  async getAll(req, res) {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  async getById(req, res) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(req.params.id) }
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  },

  async create(req, res) {
    try {
      const { name, price, category } = req.body;
      const product = await prisma.product.create({
        data: { name, price: parseFloat(price), category, userId: req.user.id }
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  },

  async update(req, res) {
    try {
      const { name, price, category } = req.body;
      const product = await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: { name, price: parseFloat(price), category }
      });
      res.json(product);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(500).json({ error: 'Failed to update product' });
    }
  },

  async delete(req, res) {
    try {
      await prisma.product.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
};

module.exports = productController;