const { response, request } = require("express");
const CustomError = require("../config/errors");
const ComponentModel = require("../database/models/component.model");
const SystemModel = require("../database/models/system.model");

class ComponentController {
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

  static getComponents = async (req = request, res = response) => {
    try {
      const { component_team } = req.params;
      let components = await ComponentModel.findAll(component_team);
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
        data: components,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static save = async (req = request, res = response) => {
    try {
      const data = req.body;
      if (data && data.length) {
        for (const component of data) {
          if (!component.id_component) {
            // const componentDB = await ComponentModel.findByCode(
            //   component.component_code
            // );
            // if (componentDB)
            //   throw CustomError.badRequest(
            //     `El código del componente ${component.component_code} ya se encuentra registrado en el sistema`
            //   );
            const id_component = await ComponentModel.create(
              component.component_code,
              component.component_name,
              component.component_team
            );
            component.id_component = id_component;
            if (
              component.component_systems &&
              component.component_systems.length
            ) {
              for (const system of component.component_systems) {
                // const systemDB = await SystemModel.findByCode(
                //   system.system_code
                // );
                // if (systemDB)
                //   throw CustomError.badRequest(
                //     `El código del sistema ${system.model_code} ya se encuentra registrado en el sistema`
                //   );
                const id_system = await SystemModel.create(
                  system.system_code,
                  system.system_name,
                  id_component
                );
                system.id_system = id_system;
              }
            }
          } else {
            const componentDB = await ComponentModel.findByCode(
              component.component_code
            );
            if (!componentDB)
              throw CustomError.badRequest(
                `El código del componente ${component.component_code} no se encuentra registrado en el sistema`
              );
            await ComponentModel.update(
              component.id_component,
              component.component_code,
              component.component_name
            );
            if (
              component.component_systems &&
              component.component_systems.length
            ) {
              for (const system of component.component_systems) {
                const systemDB = await SystemModel.findByCode(
                  system.system_code
                );
                if (!systemDB) {
                  const id_system = await SystemModel.create(
                    system.system_code,
                    system.system_name,
                    component.id_component
                  );
                  system.id_system = id_system;
                } else {
                  await SystemModel.update(
                    system.id_system,
                    system.system_code,
                    system.system_name
                  );
                }
              }
            }
          }
        }
      }
      return res.status(200).json({
        status: true,
        data,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static create = async (req = request, res = response) => {
    try {
      const data = req.body;
      const id_component = await ComponentModel.create(
        data.component_code,
        data.component_name,
        data.component_team
      );
      data.id_component = id_component;
      return res.status(201).json({
        status: true,
        data,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static deleteSystem = async (req = request, res = response) => {
    try {
      const { id_system } = req.params;
      const system = await SystemModel.findById(id_system);
      if (!system)
        throw CustomError.badRequest("El sistema a eliminar no existe");
      await SystemModel.deleteById(id_system);
      return res.status(200).json({
        status: true,
        data: null,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static deleteComponent = async (req = request, res = response) => {
    try {
      const { id_component } = req.params;
      const component = await ComponentModel.findById(id_component);
      if (!component)
        throw CustomError.badRequest("El componente a eliminar no existe");
      await ComponentModel.deleteById(id_component);
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

module.exports = ComponentController;
