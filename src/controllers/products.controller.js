import productsManager from "../data/products.manager.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "PRODUCTS READ", response });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getProduct(req, res, next) {
  // res es el objeto de respuesta a enviar al cliente
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    // response es la respuesta que se espera del manager (para leer un producto)
    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

/*async function createGet(req, res, next) {
  try {
    const { title, price, quantity } = req.params;
    let { category, supplier } = req.query;
    if (!category) {
      category = "none";
    }
    if (!supplier) {
      supplier = "none";
    }
    const response = await productsManager.create({
      title,
      price,
      quantity,
      category,
      supplier,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    return next(error);
  }
}*/

async function createProduct(req, res, next) {
  try {
    const data = req.body;
    //guardo el objeto que envia el front con los datos de lo que se necesita crear
    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const responseManager = await productsManager.update(pid, newData);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "PRODUCT UPDATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "PRODUCT DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
};
