import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    // 0. apenas se crea la instancia se tiene que verificar si existe o no existe el archivo
    // si no existe, hay que crearlo con un array vacío
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("file created");
    } else {
      console.log("file already exists");
    }
  }
  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      //console.log(parseData);

      return parseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async read(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      //console.log(one);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAll();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((user) => user.id === id);
      if (index === -1) {
        return null;
      }
      // Actualizamos el usuario
      all[index] = { ...all[index], ...newData };
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return all[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Método para eliminar un usuario
  async delete(id) {
    try {
      const all = await this.readAll();
      const filtered = all.filter((user) => user.id !== id);
      if (all.length === filtered.length) {
        return null;
      }
      const stringAll = JSON.stringify(filtered, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return `User with id ${id} deleted`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;
