import axios from "axios";
import { React, useState } from "react";

import { IoTrashSharp } from "react-icons/io5";

const Modal = ({ isVisible, onClose, editPatient }) => {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [petDOB, setPetDOB] = useState();
  const [petType, setPetType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  async function handleRemovePatient() {
    try {
      const result = await axios
        .delete("/api/patients", {
          data: { patientId: editPatient._id },
        })
        .then(console.log("Sent delete api request.."));
      if (result.status == 200) {
        console.log("removed");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdatePatient(e) {
    e.preventDefault();
    console.log("in update function");
    try {
      const newPatient = {
        patientId: editPatient._id,
        ownerName: ownerName,
        phoneNumber: phone,
        petName: petName,
        petDOB: petDOB,
        petType: petType,
      };
      console.log(newPatient);

      const result = await axios
        .put("/api/patients", newPatient)
        .then(console.log("Sent put api request.."));
      if (result.status == 200) {
        window.location.reload(false);

        console.log("success");
      }
    } catch (error) {
      console.log("Error in handleUpdatePatient fucntion..");
      console.log(error);

      if (error.response.status == 400) {
        console.log(error.response.data);
        console.log(error.response.status);
        setErrorMessage(error.response.data);
      }
    }
  }

  async function handleNewPatient(e) {
    e.preventDefault();
    try {
      const newPatient = {
        ownerName: ownerName,
        phoneNumber: phone,
        petName: petName,
        petDOB: petDOB,
        petType: petType,
      };
      const result = await axios
        .post("/api/patients", newPatient)
        .then(console.log("Sent api request.."));

      if (result.status == 200) {
        window.location.reload(false);
        handleClose();
      } else {
        setErrorMessage(error.response.data);
        console.log(result.json);
      }
    } catch (error) {
      console.log("Error in handleNewPatient fucntion..");

      if (error.response.status == 401) {
        setErrorMessage(error.response.data);
      }
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-x-auto"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[650px] flex flex-col">
        {editPatient ? (
          <button
            className="text-black place-self-end focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:hover:bg-white "
            type="submit"
            onClick={() => {
              handleRemovePatient();
            }}
          >
            <IoTrashSharp />
          </button>
        ) : null}

        <div className="bg-white p-2 rounded">
          {editPatient ? <h2>Edit patient</h2> : <h2>Add patient</h2>}
          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className=" appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="ownerName"
                  type="text"
                  defaultValue={editPatient ? editPatient.ownerName : ""}
                  onChange={(e) => setOwnerName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Phone
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="phone"
                  type="text"
                  defaultValue={editPatient ? editPatient.phoneNumber : ""}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Pet Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white "
                  id="petName"
                  type="text"
                  defaultValue={editPatient ? editPatient.petName : ""}
                  onChange={(e) => setPetName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Pet Birth Date
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white "
                  id="inline-password"
                  type="Date"
                  defaultValue={editPatient ? editPatient.petDOB : ""}
                  onChange={(e) => setPetDOB(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Pet Type
                </label>
              </div>
              <div className="md:w-2/3 ">
                <select
                  defaultValue={editPatient ? editPatient.petType : ""}
                  className="appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Parrot">Parrot</option>
                </select>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/2">
                <button
                  className="text-white bg-green700 hover:bg-green-800 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:hover:bg-green700"
                  type="submit"
                  onClick={editPatient ? handleUpdatePatient : handleNewPatient}
                >
                  {editPatient ? "Update" : "Add"}
                </button>
                <div>{errorMessage}</div>
              </div>
              <div className="md:w-1/2">
                <button
                  className="text-white bg-red700 hover:bg-red800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:hover:bg-red700 "
                  onClick={() => onClose()}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
