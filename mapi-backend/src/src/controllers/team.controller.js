const { response, request } = require("express");
const CustomError = require("../config/errors");
const TeamModel = require("../database/models/team.model");
const BrandModel = require("../database/models/brand.model");
const ComponentModel = require("../database/models/component.model");

class TeamController {
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

  static getTeams = async (_, res = response) => {
    try {
      const teams = await TeamModel.findAll();
      return res.status(200).json({
        status: true,
        data: teams,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static save = async (req = request, res = response) => {
    try {
      const { id_team: id, team_name } = req.body;
      let id_team = id;
      let is_new = false;
      // const teamDB = await TeamModel.findByName(team_name);
      // if (teamDB)
      //   throw CustomError.badRequest("El equipo ya ha sido registrado");
      if (id === 0) {
        id_team = await TeamModel.create(team_name);
        is_new = true;
      } else {
        // if (teamDB)
        //   throw CustomError.badRequest("El equipo ya ha sido registrado");
        await TeamModel.update(team_name, id);
      }
      return res.status(200).json({
        status: true,
        data: {
          is_new,
          team: {
            id_team,
            team_name,
          },
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static getDetail = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const teamDB = await TeamModel.findById(id);
      if (!teamDB) throw CustomError.badRequest("El equipo no existe");
      let brands = await BrandModel.findAll(id);
      if (brands && brands.length) {
        brands = Object.values(
          brands.reduce((acc, curr) => {
            if (!acc[curr.id_brand]) {
              acc[curr.id_brand] = {
                id_brand: curr.id_brand,
                brand_code: curr.brand_code,
                brand_name: curr.brand_name,
                brand_team: parseInt(id),
                brand_models: [],
              };
            }
            if (curr.id_model) {
              acc[curr.id_brand].brand_models.push({
                id_model: curr.id_model,
                model_code: curr.model_code,
                model_name: curr.model_name,
                model_init_year: curr.model_init_year,
                model_final_year: curr.model_final_year,
                model_engine: curr.model_engine,
                model_transmission: curr.model_transmission,
                model_application: curr.model_application,
                model_suspension: curr.model_suspension,
                model_rear_bridge: curr.model_rear_bridge,
                model_brand: curr.model_brand,
              });
            }
            return acc;
          }, {})
        );
      }
      let components = await ComponentModel.findAll(id);
      if (components && components.length) {
        components = Object.values(
          components.reduce((acc, curr) => {
            if (!acc[curr.id_component]) {
              acc[curr.id_component] = {
                id_component: curr.id_component,
                component_code: curr.component_code,
                component_name: curr.component_name,
                component_systems: [],
              };
            }
            if (curr.id_system) {
              acc[curr.id_component].component_systems.push({
                id_system: curr.id_system,
                system_code: curr.system_code,
                system_name: curr.system_name,
                system_component: curr.system_component,
              });
            }
            return acc;
          }, {})
        );
      }
      return res.status(200).json({
        status: true,
        data: { team: teamDB, brands, components },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static delete = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const teamDB = await TeamModel.findById(id);
      if (!teamDB) throw CustomError.badRequest("El equipo no existe");
      await TeamModel.deleteById(id);
      return res.status(200).json({
        status: true,
        data: null,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

 
}

module.exports = TeamController;
