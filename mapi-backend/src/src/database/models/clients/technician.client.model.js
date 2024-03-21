class TechnicianClientModel {
  constructor(db) {
    this._db = db;
  }

  findAll = async () => {
    try {
      const technicians = this._db
        .select(["id_technician", "technician_name", "technician_code"])
        .from("mp_technician")
        .where("technician_state", 1);
      return technicians;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TechnicianClientModel;
