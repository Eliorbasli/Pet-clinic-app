import { IPatient } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../utils/connectDB";
import Patient from "../../models/PatientModal";

interface PatientResult {
  pateints?: Array<IPatient> | IPatient;
}

function containsNumber(str: any) {
  return /[0-9]/.test(str);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>
) {
  await connectMongo();
  if (req.method === "POST") {
    return await create(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
  if (req.method === "DELETE") {
    return await del(req, res);
  }
  if (req.method === "PUT") {
    return await put(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body === null) {
      return res.status(400).json("req body is null..");
    }
    const ownerName = String(req.body.ownerName);
    const phoneNumber = String(req.body.phoneNumber);
    const petName = req.body.petName;
    const petDOB = req.body.petDOB;
    const petType = req.body.petType;

    if (ownerName == "" || phoneNumber == "" || petName == "" || petDOB == "") {
      console.log("Please fill in all fields");
      return res.status(400).json("Please fill in all fields");
    }
    if (containsNumber(ownerName) || containsNumber(petName)) {
      console.log("name contain number.. please check ");
      return res.status(400).json("Please fill in all fields");
    }

    if (petType != "Cat" && petType != "Dog" && petType != "Parrot") {
      return res.status(400).json("Please select Dog/Cat/Parrot");
    } else {
      console.log("patient created ");

      const result = await Patient.create(req.body);
      return res.status(200).json({ result });
    }
  } catch (err) {
    res.status(501).json(err);
  }
};

const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await Patient.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const patientId = req.body.patientId;

    const result = await Patient.findByIdAndDelete(patientId);
    if (!result) {
      res.status(501).json("Not found this id..");
    }

    console.log(`${patientId} deleted `);
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
};

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await Patient.findOneAndUpdate(
      { _id: req.body.patientId },
      req.body
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
};
