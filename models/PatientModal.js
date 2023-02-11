import { Schema, model, models } from "mongoose";

const PatientSchema = new Schema(
  {
    ownerName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    phoneNumber: {
      type: String,
    },
    petName: {
      type: String,
      required: true,
    },
    petDOB: {
      type: Date,
    },
    petType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Patient = models.Patient || model("Patient", PatientSchema);

export default Patient;
