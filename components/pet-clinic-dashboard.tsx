import { useState } from "react";
import TableDashboard from "./TableDashboard";
import Modal from "./Modal";

export const PetClinicDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 max-w-screen-lg mx-auto">
      <Title />
      {/* <Table /> */}
      <TableDashboard />
      <button
        className="text-white bg-blue700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center"
        onClick={() => setShowModal(true)}
      >
        Add new patient
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

const Title = () => {
  return (
    <h1 className="text-primary font-bold text-3xl">Pet Clinic Dashboard</h1>
  );
};
