const { response } = require("express");
const path = require("path");
const CustomError = require("../config/errors");
const UserModel = require("../database/models/user.model");
const { getFile, uploadFile, deleteFile } = require("../config/s3");

class UserController {
  static limit = 10;

  static #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ status: false, data: null, error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: false, data: null, error: "Internal Server Error" });
  };

  static getDetailsUserTeam = async (req, res = response) => {
    try {
      const { id } = req.params;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const details = await userModel.detailsUserTeam(id);
      return res.status(200).json({
        status: true,
        data: details,
        error: null,
      });
    } finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static getListPersonPage = async (req = request, res = response) => {
    try {
      const orderBy = req.query.orderBy || "ASC";
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * this.limit;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const listPage = await userModel.listPersonPage(
        this.limit,
        offset,
        orderBy
      );
      const { total } = await userModel.getTotallListPerson();
      const totalPages = Math.ceil(total / this.limit);
      return res.status(200).json({
        status: true,
        data: { totalPages, listPage },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    } finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static saveUser = async (req = request, res = response) => {
    try {
      const data = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const file = req.files;
      if (!parseInt(data.id_user)) {
        const id_user = await userModel.create(data);
        data.id_user = id_user;
      } else {
        await userModel.update(data);
      }
      if (file && file.user_photo) {
        const { user_photo } = file;
        const { subdomain } = req;
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const extension = path.extname(user_photo.name);
        const filename = `${subdomain}/avatars/${data.id_user}/avatar_${uniqueSuffix}${extension}`;
        await uploadFile(filename, user_photo.mimetype, user_photo.data);
        const user = await userModel.findById(data.id_user);
        if (user.user_photo) {
          await deleteFile(user.user_photo);
        }
        const url = await getFile(filename);
        data.user_photo = url;
        await userModel.updateColumnByUserId(data.id_user, {
          user_photo: filename,
        });
      }
      return res.status(200).json({
        status: true,
        data,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    } finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };
}

module.exports = UserController;
