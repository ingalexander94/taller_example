const { response, request } = require("express");
const CustomError = require("../config/errors");
const BrandModel = require("../database/models/brand.model");
const ModelModel = require("../database/models/model.model");
const generateUniqueCode = require("../helpers/generator");

class BrandController {
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

  static getBrands = async (req = request, res = response) => {
    try {
      const { brand_team } = req.params;
      let brands = await BrandModel.findAll(brand_team);
      if (brands && brands.length) {
        brands = Object.values(
          brands.reduce((acc, curr) => {
            if (!acc[curr.id_brand]) {
              acc[curr.id_brand] = {
                id_brand: curr.id_brand,
                brand_code: curr.brand_code,
                brand_name: curr.brand_name,
                brand_models: [],
              };
            }
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
            return acc;
          }, {})
        );
      }
      return res.status(200).json({
        status: true,
        data: brands,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static getModelsByTeam = async (req = request, res = response) => {
    try {
      const { brand_team } = req.params;
      let brands = await ModelModel.findByBrandTeam(brand_team);
      if (brands && brands.length) {
        brands = Object.values(
          brands.reduce((acc, curr) => {
            if (!acc[curr.id_brand]) {
              acc[curr.id_brand] = {
                id_brand: curr.id_brand,
                brand_code: curr.brand_code,
                brand_name: curr.brand_name,
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
      return res.status(200).json({
        status: true,
        data: brands,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static getUniqueCode = async (req = request, res = response) => {
    try {
      const { brand_name, brand_code, brand_team } = req.query;
      if (!brand_name)
        throw CustomError.badRequest("El nombre de la marca es necesario");
      const brand = await BrandModel.findByName(brand_name, brand_team);
      if (
        brand_code &&
        brand &&
        brand.brand_name.toUpperCase() === brand_name.toUpperCase()
      )
        return res.status(200).json({
          status: true,
          data: {
            isValid: true,
            brand_code: brand.brand_code,
          },
          error: null,
        });
      let codes = await BrandModel.getCodes(brand_team);
      codes = codes.map(({ brand_code }) => brand_code.toUpperCase());
      const newCode =
        brand === null ? generateUniqueCode(brand_name, codes) : "";
      return res.status(200).json({
        status: true,
        data: {
          isValid: brand === null,
          brand_code: newCode,
        },
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
        for (const brand of data) {
          if (!brand.id_brand) {
            // const brandDB = await BrandModel.findByCode(brand.brand_code);
            // if (brandDB)
            //   throw CustomError.badRequest(
            //     `El código de marca ${brand.brand_code} ya se encuentra registrado en el sistema`
            //   );
            const id_brand = await BrandModel.create(
              brand.brand_code,
              brand.brand_name,
              brand.brand_team
            );
            brand.id_brand = id_brand;
            if (brand.brand_models && brand.brand_models.length) {
              for (const model of brand.brand_models) {
                // const modelDB = await ModelModel.findByCode(model.brand_code);
                // // if (modelDB)
                // //   throw CustomError.badRequest(
                // //     `El código del modelo ${model.model_code} ya se encuentra registrado en el sistema`
                // //   );
                const id_model = await ModelModel.create(
                  model.model_code,
                  model.model_name,
                  model.model_init_year,
                  model.model_final_year,
                  model.model_engine,
                  model.model_transmission,
                  model.model_application,
                  id_brand,
                  model.model_rear_bridge,
                  model.model_suspension
                );
                model.id_model = id_model;
              }
            }
          } else {
            const brandDB = await BrandModel.findByCode(brand.brand_code);
            if (!brandDB)
              throw CustomError.badRequest(
                `El código de marca ${brand.brand_code} no se encuentra registrado en el sistema`
              );
            await BrandModel.update(
              brand.id_brand,
              brand.brand_code,
              brand.brand_name
            );
            if (brand.brand_models && brand.brand_models.length) {
              for (const model of brand.brand_models) {
                const modelDB = await ModelModel.findByCode(model.model_code);
                if (!modelDB) {
                  const id_model = await ModelModel.create(
                    model.model_code,
                    model.model_name,
                    model.model_init_year,
                    model.model_final_year,
                    model.model_engine,
                    model.model_transmission,
                    model.model_application,
                    brand.id_brand,
                    model.model_suspension,
                    model.model_rear_bridge
                  );
                  model.id_model = id_model;
                } else {
                  await ModelModel.update(
                    model.id_model,
                    model.model_code,
                    model.model_name,
                    model.model_init_year,
                    model.model_final_year,
                    model.model_engine,
                    model.model_transmission,
                    model.model_application,
                    model.model_suspension,
                    model.model_rear_bridge
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
      let codes = await BrandModel.getCodes(data.brand_team);
      codes = codes.map(({ brand_code }) => brand_code.toUpperCase());
      const newCode = generateUniqueCode(data.brand_name, codes);
      data.brand_code = newCode;
      const id_brand = await BrandModel.create(
        data.brand_code,
        data.brand_name,
        data.brand_team
      );
      data.id_brand = id_brand;
      return res.status(200).json({
        status: true,
        data,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static deleteModel = async (req = request, res = response) => {
    try {
      const { id_model } = req.params;
      const model = await ModelModel.findById(id_model);
      if (!model)
        throw CustomError.badRequest("El modelo a eliminar no existe");
      await ModelModel.deleteById(id_model);
      let models = await ModelModel.findByBrand(model.model_brand);
      const brand = await BrandModel.findById(model.model_brand);
      if (models.length) {
        models = models.map(({ id_model }, i) => ({
          id_model,
          model_code: `${brand.brand_code}${i + 1}`,
        }));
        for (const data of models) {
          await ModelModel.updateCode(data.id_model, data.model_code);
        }
      }
      return res.status(200).json({
        status: true,
        data: null,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static deleteBrand = async (req = request, res = response) => {
    try {
      const { id_brand } = req.params;
      const brand = await BrandModel.findById(id_brand);
      if (!brand) throw CustomError.badRequest("La marca a eliminar no existe");
      await BrandModel.deleteById(id_brand);
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

module.exports = BrandController;
