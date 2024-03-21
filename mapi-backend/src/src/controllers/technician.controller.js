const { response } = require("express");
const CustomError = require("../config/errors");
const TechnicianModel = require("../database/models/technician.model");
const CurrentDateTime = require("../helpers/getDateNow");

class TechnicianController {
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

  static getAllTechnician = async (req = request, res = response) => {
    try {
      const { page } = req.params;
      const technician = await TechnicianModel.findAll(page);
      const all_technician = await TechnicianModel.totalPages(page);
      const last_page = Math.ceil(all_technician.length / 10);
      const total = all_technician.length;

      return res.status(200).json({
        status: true,
        data: {
          total,
          current_page: parseInt(page),
          last_page,
          technician,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static getTechnician = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const technician = await TechnicianModel.findById(id);

      return res.status(200).json({
        status: true,
        data: technician,
        error: technician ? null : "El técnico no existe",
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static verifyTechnicianName = async (req = request, res = response) => {
    try {
      const { name } = req.params;

      const valid_technician_name = await TechnicianModel.verifyTecnhnicianName(
        name
      );

      return res.status(200).json({
        status: valid_technician_name ? false : true,
        data: {
          message: valid_technician_name
            ? "El nombre del técnico ya existe"
            : "El nombre del técnico es valido",
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static verifyTechnicianCode = async (req = request, res = response) => {
    try {
      const { code } = req.params;

      const valid_technician_code = await TechnicianModel.verifyTecnhnicianCode(
        code
      );

      return res.status(200).json({
        status: valid_technician_code ? false : true,
        data: {
          message: valid_technician_code
            ? "El código del técnico ya existe"
            : "El código del técnico es valido",
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static save = async (req = request, res = response) => {
    try {
      const { id_technician, technician_name, technician_code } = req.body;
      let data = req.body;
      let is_new = true;
      let message = "";

      const technician = await TechnicianModel.findById(id_technician);
      const valid_technician_name = await TechnicianModel.verifyTecnhnicianName(
        technician_name
      );
      const valid_technician_code = await TechnicianModel.verifyTecnhnicianCode(
        technician_code
      );

      data = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
      );
      if (technician != undefined) {
        is_new = false;
        delete data.created_at;
        message = "El usuario fue actualizado con exito";
        data.updated_at = CurrentDateTime();
        await TechnicianModel.updateColumnByTechnicianId(id_technician, data);
      } else {
        if (valid_technician_name)
          throw CustomError.badRequest("El nombre del técnico ya existe");
        if (valid_technician_code)
          throw CustomError.badRequest("El código técnico ya existe");

        data.technician_state = 1;
        data.created_at = CurrentDateTime();
        await TechnicianModel.create(data);
        message = "El tecnico fue creado con exito";
      }

      return res.status(200).json({
        status: true,
        data: {
          is_new,
          message,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static delete = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const updated_technician = await TechnicianModel.deleteById(id);
      if (updated_technician == 0)
        throw CustomError.badRequest("El técnico no existe");
      return res.status(200).json({
        status: true,
        data: {
          message: "El técnico ha sido eliminado con éxito.",
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static search = async (req = request, res = response) => {
    try {
      const data = req.body;
      const technicians_found =
        await TechnicianModel.searchTecnhnicianCodeOrName(data);
      const { total } = await TechnicianModel.searchTecnhnicianCount(data);
      const last_page = Math.ceil(total / 10);

      return res.status(200).json({
        status: true,
        data: {
          last_page,
          technician: technicians_found ?? null,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };
}

module.exports = TechnicianController;
