class BridgeModel {
  constructor(db) {
    this._db = db;
  }

  getBridgeById = async (id_bridge) => {
    try {
      const bridge = await this._db
        .select("*")
        .from("mp_bridges")
        .where("id_bridge", "=", id_bridge)
        .first();
      return bridge;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  create = async (bridge) => {
    try {
      const [id_bridge] = await this._db
        .insert(
          {
            bridge_front_brand: bridge.bridge_front_brand,
            bridge_front_model: bridge.bridge_front_model,
            bridge_serial: bridge.bridge_serial,
            bridge_front_suspension: bridge.bridge_front_suspension,
            bridge_rear_suspension: bridge.bridge_rear_suspension,
            bridge_rear_brand: bridge.bridge_rear_brand,
            bridge_rear_model: bridge.bridge_rear_model,
            bridge_intermediate_differential:
              bridge.bridge_intermediate_differential,
            bridge_rear_differential: bridge.bridge_rear_differential,
          },
          ["id_bridge"]
        )
        .into("mp_bridges");
      return id_bridge;
    } catch (error) {
      throw error;
    }
  };

  update = async (bridge) => {
    try {
      await this._db
        .from("mp_bridges")
        .where({ id_bridge: bridge.id_bridge })
        .update({
          bridge_front_brand: bridge.bridge_front_brand,
          bridge_front_model: bridge.bridge_front_model,
          bridge_serial: bridge.bridge_serial,
          bridge_front_suspension: bridge.bridge_front_suspension,
          bridge_rear_suspension: bridge.bridge_rear_suspension,
          bridge_rear_brand: bridge.bridge_rear_brand,
          bridge_rear_model: bridge.bridge_rear_model,
          bridge_intermediate_differential:
            bridge.bridge_intermediate_differential,
          bridge_rear_differential: bridge.bridge_rear_differential,
        });
      return bridge.id_bridge;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = BridgeModel;
