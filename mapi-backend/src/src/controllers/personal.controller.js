const { response } = require("express");
const path = require("path");
const CustomError = require("../config/errors");
const { getFile, uploadFile, deleteFile } = require("../config/s3");
const envs = require("../config/environments");
const PersonalClientModel = require("../database/models/clients/personal.client.model");
const TechnicianClientModel = require("../database/models/clients/technician.client.model");

class PersonalController {
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

  static savePersonal = async (req = request, res = response) => {
    try {
      const data = req.body;
      const dbConnection = req.clientConnection;
      const personalModel = new PersonalClientModel(dbConnection);
      const file = req.files;
      data.id_personal = parseInt(data.id_personal);
      data.personal_salary = parseInt(data.personal_salary);
      data.personal_technician = parseInt(data.personal_technician);
      let personal = null;
      const defaultAvatar = await getFile(envs.DEFAULT_AVATAR);
      if (!data.id_personal) {
        const id_personal = await personalModel.create(data);
        data.id_personal = id_personal;
        data.personal_photo = defaultAvatar;
      } else {
        personal = await personalModel.findById(data.id_personal);
        if (!personal) throw CustomError.badRequest("User personal not exist");
        await personalModel.update(data);
        data.personal_photo = defaultAvatar;
      }
      if (file && file.personal_photo) {
        const { personal_photo } = file;
        const { subdomain } = req;
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const extension = path.extname(personal_photo.name);
        const filename = `${subdomain}/avatars/${data.id_personal}/avatar_${uniqueSuffix}${extension}`;
        await uploadFile(
          filename,
          personal_photo.mimetype,
          personal_photo.data
        );
        const url = await getFile(filename);
        data.personal_photo = url;
        await personalModel.updateColumnByUserId(data.id_personal, {
          personal_photo: filename,
        });
      }
      if (
        personal &&
        personal.personal_photo &&
        !personal.personal_photo.includes(envs.DEFAULT_AVATAR)
      ) {
        await deleteFile(personal.personal_photo);
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

  static getAll = async (req = request, res = response) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const search = req.query.search;
      const offset = (page - 1) * this.limit;
      const dbConnection = req.clientConnection;
      const personalModel = new PersonalClientModel(dbConnection);
      let totalPages = 1;
      let personals = [];
      if (search) {
        personals = await personalModel.searchByNameOrDocument(search);
      } else {
        personals = await personalModel.getByPage(this.limit, offset);
      }
      if (personals.length) {
        for (const personal of personals) {
          const url = await getFile(personal.personal_photo);
          personal.personal_photo = url;
        }
        if (!search) {
          const { total } = await personalModel.getTotal();
          totalPages = Math.ceil(total / this.limit);
        }
      }
      return res.status(200).json({
        status: true,
        data: { totalPages, personals },
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

  static getDownloadData = async (req = request, res = response) => {
    try {
      const dbConnection = req.clientConnection;
      const personalModel = new PersonalClientModel(dbConnection);
      const personals = await personalModel.getData();
      return res.status(200).json({
        status: true,
        data: personals,
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

  static getDetail = async (req, res = response) => {
    try {
      let { id } = req.params;
      id = parseInt(id);
      const dbConnection = req.clientConnection;
      const personalModel = new PersonalClientModel(dbConnection);
      const technicianModel = new TechnicianClientModel(dbConnection);
      const technicians = await technicianModel.findAll();
      const url = await getFile(envs.DEFAULT_AVATAR);
      if (!id) {
        return res.status(200).json({
          status: true,
          data: {
            personal: {
              id_personal: 0,
              personal_names: "",
              personal_surnames: "",
              personal_document: "",
              personal_technician: 0,
              technician_name: "",
              personal_phone: "",
              personal_salary: 0,
              personal_photo: url,
            },
            technicians,
            avatar: url,
          },
          error: null,
        });
      }

      const personal = await personalModel.findById(id);
      if (!personal) throw CustomError.badRequest("User personal not exist");
      personal.personal_photo = await getFile(personal.personal_photo);
      return res.status(200).json({
        status: true,
        data: { personal, technicians, avatar: url },
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

  static deletePersonal = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const dbConnection = req.clientConnection;
      const personalModel = new PersonalClientModel(dbConnection);
      const personal = await personalModel.findById(id);
      if (!personal) throw CustomError.badRequest("User personal not exist");
      await personalModel.deleteById(id);
      if (personal.personal_photo !== envs.DEFAULT_AVATAR) {
        await deleteFile(personal.personal_photo);
      }
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
}

module.exports = PersonalController;
