import usersManager from "../data/users.manager.js";

async function getAllUser(req, res, next) {
  try {
    let response = await usersManager.readAll();

    if (response.length > 0) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("NOT FOUND USER");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  // res es el objeto de respuesta a enviar al cliente
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    // response es la respuesta que se espera del manager (para leer un producto)
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("NOT FOUND USER");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    //guardo el objeto que envia el front con los datos de lo que se necesita crear
    const responseManager = await usersManager.create(data);
    return res
      .status(201)
      .json({ message: "USER CREATED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const responseManager = await usersManager.update(uid, newData);
    if (!responseManager) {
      const error = new Error(`Product with id ${uid} not found`);
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

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "USER DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

export { getAllUser, getUser, createUser, updateUser, destroyUser };
