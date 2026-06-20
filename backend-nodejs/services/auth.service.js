const Product = require("../models/product.model");

const getAll = async () => {
  return await Product.findAll();
};

const getById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Sản phẩm không tồn tại");
  return product;
};

const create = async ({ name, price, stock }) => {
  return await Product.create({ name, price, stock });
};

const update = async (id, { name, price, stock }) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Sản phẩm không tồn tại");
  await product.update({ name, price, stock });
  return product;
};

const remove = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Sản phẩm không tồn tại");
  await product.destroy();
};

module.exports = { getAll, getById, create, update, remove };
