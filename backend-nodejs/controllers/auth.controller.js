const productService = require("../services/auth.service");

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({ message: "Tạo thành công", data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.status(200).json({ message: "Cập nhật thành công", data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await productService.remove(req.params.id);
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
