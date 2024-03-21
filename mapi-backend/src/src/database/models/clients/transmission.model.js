class TransmissionModel {
  constructor(db) {
    this._db = db;
  }

  getTransmissionById = async (id_transmission) => {
    try {
      const transmission = await this._db
        .select("*")
        .from("mp_transmissions")
        .where("id_transmission", "=", id_transmission)
        .first();
      return transmission;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  create = async (transmission) => {
    try {
      const [id_transmission] = await this._db
        .insert(
          {
            transmission_brand: transmission.transmission_brand,
            transmission_model: transmission.transmission_model,
            transmission_oil_cooler: transmission.transmission_oil_cooler,
            transmission_serial: transmission.transmission_serial,
          },
          ["id_transmission"]
        )
        .into("mp_transmissions");
      return id_transmission;
    } catch (error) {
      throw error;
    }
  };

  update = async (transmission) => {
    try {
      await this._db
        .from("mp_transmissions")
        .where({ id_transmission: transmission.id_transmission })
        .update({
          transmission_brand: transmission.transmission_brand,
          transmission_model: transmission.transmission_model,
          transmission_oil_cooler: transmission.transmission_oil_cooler,
          transmission_serial: transmission.transmission_serial,
        });
      return transmission.id_transmission;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TransmissionModel;
