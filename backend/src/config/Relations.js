import { Patient } from "./Models/Patient.js";
import { Disease } from "./Models/Disease.js";
import { Doctor } from "./Models/Doctor.js";
import { Visit } from "./Models/Visit.js";

Patient.belongsTo(Disease, { foreignKey: 'disease' });
Disease.hasMany(Patient, { foreignKey: 'disease' });

Visit.belongsTo(Disease, { foreignKey: 'disease_id' });
Visit.belongsTo(Doctor, { foreignKey: 'doctor_id' });

export {
    Patient,
    Disease,
    Doctor,
    Visit
}