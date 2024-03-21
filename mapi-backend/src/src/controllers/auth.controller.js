const { response, request } = require("express");
const CustomError = require("../config/errors");
const Encrypter = require("../config/encryptor");
const JWT = require("../config/jwt");
const UserModel = require("../database/models/user.model");
const UserRoleModel = require("../database/models/user-role.model");
const { sendRecoveryCode } = require("../email/emails");

class AuthController {
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

  static login = async (req = request, res = response) => {
    try {
      let { email, password } = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const userRoleModel = new UserRoleModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      const { user_password, user_state } = user;
      if (!user_state) throw CustomError.unauthorized("User is not active");
      const isValidPassword = Encrypter.compare(password, user_password);
      if (!isValidPassword)
        throw CustomError.unauthorized("Password is not valid");
      await userModel.updateColumnByUserId(user.id_user, { user_code: null });
      const roles = await userRoleModel.findByIdUser(user.id_user);
      const token = await JWT.generateToken({
        email: user.user_email,
        roles,
      });
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            names: user.user_names,
            surnames: user.user_surnames,
            email: user.user_email,
            photo: user.user_photo,
            roles,
          },
        },
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

  static validateEmail = async (req = request, res = response) => {
    try {
      let { email } = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      return res.status(200).json({ status: true, data: null, error: null });
    } catch (error) {
      this.#handleError(error, res);
    } finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static renew = async (req = request, res = response) => {
    try {
      const { email } = req;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const userRoleModel = new UserRoleModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      const { user_state } = user;
      if (!user_state) throw CustomError.unauthorized("User is not active");
      const roles = await userRoleModel.findByIdUser(user.id_user);
      const token = await JWT.generateToken({
        email: user.user_email,
        roles,
      });
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            names: user.user_names,
            surnames: user.user_surnames,
            email: user.user_email,
            photo: user.user_photo,
            roles,
          },
        },
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

  static recoveryPassword = async (req = request, res = response) => {
    try {
      let { email } = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      const { user_state } = user;
      if (!user_state) throw CustomError.unauthorized("User is not active");
      const code = Math.floor(Math.random() * 900000) + 100000;
      await userModel.updateColumnByUserId(user.id_user, { user_code: code });
      const sendEmail = await sendRecoveryCode(email, code);
      if (!sendEmail)
        throw CustomError.notFound(
          "An error occurred while sending the recovery email"
        );
      return res.status(200).json({
        status: true,
        data: null,
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

  static validateCode = async (req = request, res = response) => {
    try {
      let { email, code } = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      if (user.user_code !== code)
        throw CustomError.unauthorized("Code is not valid");
      return res.status(200).json({
        status: true,
        data: null,
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

  static updatePassword = async (req = request, res = response) => {
    try {
      let { email, password, code } = req.body;
      const dbConnection = req.clientConnection;
      const userModel = new UserModel(dbConnection);
      const userRoleModel = new UserRoleModel(dbConnection);
      const user = await userModel.findByEmail(email);
      if (!user) throw CustomError.notFound("User not exist");
      if (user.user_code !== code)
        throw CustomError.unauthorized("Code is not valid");
      const newPassword = Encrypter.hash(password);
      await userModel.updateColumnByUserId(user.id_user, { user_code: null });
      await userModel.updateColumnByUserId(user.id_user, {
        user_password: newPassword,
      });
      const roles = await userRoleModel.findByIdUser(user.id_user);
      const token = await JWT.generateToken({
        email: user.user_email,
        roles,
      });
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            names: user.user_names,
            surnames: user.user_surnames,
            email: user.user_email,
            photo: user.user_photo,
            roles,
          },
        },
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

module.exports = AuthController;
