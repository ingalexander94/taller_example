class EngineModel {
  constructor(db) {
    this._db = db;
  }

  getEngineById = async (id_engine) => {
    try {
      const engine = await this._db
        .select("*")
        .from("mp_engines")
        .where("id_engine", "=", id_engine)
        .first();
      return engine;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  create = async (engine) => {
    try {
      const [id_engine] = await this._db
        .insert(
          {
            engine_brand: engine.engine_brand,
            engine_model: engine.engine_model,
            engine_cylinder_capacity: engine.engine_cylinder_capacity,
            engine_serial: engine.engine_serial,
            engine_power: engine.engine_power,
            engine_torque: engine.engine_torque,
            engine_rpm_power: engine.engine_rpm_power,
            engine_governed_speed: engine.engine_governed_speed,
            engine_ecm_name: engine.engine_ecm_name,
            engine_ecm_code: engine.engine_ecm_code,
            engine_part_ecm: engine.engine_part_ecm,
            engine_serial_ecm: engine.engine_serial_ecm,
            engine_cpl: engine.engine_cpl,
          },
          ["id_engine"]
        )
        .into("mp_engines");
      return id_engine;
    } catch (error) {
      throw error;
    }
  };

  update = async (engine) => {
    try {
      await this._db
        .from("mp_engines")
        .where({ id_engine: engine.id_engine })
        .update({
          engine_brand: engine.engine_brand,
          engine_model: engine.engine_model,
          engine_cylinder_capacity: engine.engine_cylinder_capacity,
          engine_serial: engine.engine_serial,
          engine_power: engine.engine_power,
          engine_torque: engine.engine_torque,
          engine_rpm_power: engine.engine_rpm_power,
          engine_governed_speed: engine.engine_governed_speed,
          engine_ecm_name: engine.engine_ecm_name,
          engine_ecm_code: engine.engine_ecm_code,
          engine_part_ecm: engine.engine_part_ecm,
          engine_serial_ecm: engine.engine_serial_ecm,
          engine_cpl: engine.engine_cpl,
        });
      return engine.id_engine;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = EngineModel;
