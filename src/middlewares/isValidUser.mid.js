function isValidUser(req, res, next) {
  // como todo middleware depende de req y de res
  // pero ademas necesita depender de next
  // que es la funcion encargada de "pasar" a la siguiente función (de middleware o controlador)
  try {
    const { username, mail, password } = req.body;
    if (!username || !mail || !password) {
      const error = new Error("Username, mail and password are required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default isValidUser;
