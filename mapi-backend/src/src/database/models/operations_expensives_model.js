const { connectCommonDB } = require("../common");

class OperationsExpensivesModel {
    constructor(db) {
        this._db = db;
      }

listOperationsExpensivesTeams = async (limit = 0, offset = 0)=> {
  
    try { 
        const db = this._db || (await connectCommonDB());
        const user = await db.select(
          'mpu.id_user_team',
          'mpu.ut_team',
          'mpt.team_name'
      )
      .from('mp_user_team as mpu')
      .innerJoin('mp_operating_expenses as mpo', 'mpo.ope_car_plate', 'mpu.ut_car_plate')
      .innerJoin('mp_teams as mpt', 'mpt.id_team', 'mpu.ut_team')
      .groupBy('mpu.ut_team')
      .limit(limit)
      .offset(offset);

        return user;
    }catch (error) {
        console.error(error);
        throw error;
      }

};

 totalOperationExpensivePage = async () =>{
    try {
        const db = this._db || (await connectCommonDB());
        const total = await db
          .from("mp_user_team")
          .count("mp_user_team.id_user_team AS total")
          .first();
        return total;
      } catch (error) {
        console.error(error);
        throw error;
      }
};

listOperationsExpensivesPlate = async (id_user_team)=> {
  try {
    const db = this._db || (await connectCommonDB());
    const user = await db.select('id_user_team', 'ut_car_plate')
    .from('mp_user_team')
  .where('mp_user_team.ut_team', id_user_team).groupBy('ut_car_plate');
  return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

totalOperationExpensivePlate = async () =>{
  try {
      const db = this._db || (await connectCommonDB());
      const total = await db
        .from("mp_user_team")
        .count("mp_user_team.id_user_team AS total")
        .first();
      return total;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

listInfoOperationsExpensives = async (limit = 0, offset = 0, ope_car_plate = "")=>{
try {
  const db = this._db || (await connectCommonDB());
  const [expenses] = await this._db.raw(`SELECT mpo.ope_departure_location, mpo.ope_arrival_place, mpo.ope_km_driven, mpo.ope_company, mpo.ope_product, mpo.ope_total_expenses, mpo.ope_travel_utility, mpp.personal_names, mpp.personal_surnames,  mpo.id_operating_expenses
  FROM mp_operating_expenses AS mpo
  INNER JOIN mp_personal AS mpp ON mpp.id_personal = mpo.ope_id_driver
   WHERE mpo.ope_car_plate LIKE '${ope_car_plate}%' LIMIT ${limit} OFFSET ${offset};`);
  return expenses;
} catch (error) {
      console.error(error);
      throw error;
    }

};

totalListOperationsExpensives = async (ope_car_plate = "") => {
  try {
    const db = this._db || (await connectCommonDB());
    const [total] = await this._db.raw(`SELECT count(mpo.ope_departure_location) as total
    FROM mp_operating_expenses AS mpo
    INNER JOIN mp_personal AS mpp ON mpp.id_personal = mpo.ope_id_driver
    WHERE mpo.ope_car_plate = '${ope_car_plate}';`);
    return total[0].total;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

detailsOperationExpensives = async (id_operating_expenses = 0) => {
  try {
    const db = this._db || (await connectCommonDB());
    const [details] = await this._db.raw(`SELECT mpt.team_name, mpu.ut_car_plate, mpp.id_personal, mpp.personal_names, mpp.personal_surnames, mpo.id_operating_expenses, mpo.ope_departure_location, mpo.ope_departure_date, mpo.ope_arrival_place, mpo.ope_arrival_date, mpo.ope_km_driven, mpo.ope_company, mpo.ope_name_manager, mpo.ope_phone_manager,mpo.ope_product
    FROM mp_operating_expenses AS mpo 
    INNER JOIN mp_user_team AS mpu ON mpu.ut_car_plate = mpo.ope_car_plate
    INNER JOIN mp_teams AS mpt ON mpt.id_team = mpu.ut_team
    INNER JOIN mp_personal AS mpp ON  mpo.ope_id_driver = mpp.id_personal 
    WHERE mpo.id_operating_expenses = ${id_operating_expenses};`);
  return details;
  }catch (error) {
    console.error(error);
    throw error;
  }
};

expensesDetailOperations = async (id_operating_expenses)=> {
  try {
    const db = this._db || (await connectCommonDB());
    const [expenses] = await this._db.raw(`SELECT mpe.ed_concept, mpe.ed_price, mpo.id_operating_expenses
    FROM mp_operating_expenses AS mpo
    INNER JOIN mp_expenses_detail AS mpe ON mpe.ed_id_operating = mpo.id_operating_expenses
    WHERE mpo.id_operating_expenses = ${id_operating_expenses};`)
    return expenses;
  }catch (error) {
    console.error(error);
    throw error;
  }
};

createOperatingExpenses = async (operating_expenses)=> {
  try {
   
    const [id_operating_expenses] = await this._db.insert({
      ope_car_plate: operating_expenses.ope_car_plate,
      ope_phone_manager: operating_expenses.ope_phone_manager,
      ope_company: operating_expenses.ope_company,
      ope_name_manager: operating_expenses.ope_name_manager,
      ope_advance_company: operating_expenses.ope_advance_company,
      ope_departure_date: operating_expenses.ope_departure_date,
      ope_km_driven: operating_expenses.ope_km_driven,
      ope_departure_location:operating_expenses.ope_departure_location,
      ope_arrival_date: operating_expenses.ope_arrival_date,
      ope_arrival_place: operating_expenses.ope_arrival_place,
      ope_id_driver: operating_expenses.ope_id_driver
  },
  ["id_operating_expenses"])
  .into("mp_operating_expenses")
    return id_operating_expenses;
  }catch (error) {
    console.error(error);
    throw error;
  }
};

createConceptPrice = async (sql) => {
  try {
    
    const res = await this._db.raw(sql)
    return res;

  }catch (error) {
    console.error(error);
    throw error;
  }
};

}

module.exports = OperationsExpensivesModel;