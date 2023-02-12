export async function validationPatient(request) {
  console.log("from validation");

  const ownerName = String(request.ownerName);
  const phoneNumber = String(request.phoneNumber);
  const petName = request.petName;
  const petDOB = request.petDOB;
  const petType = request.petType;

  const today = new Date();
  const dateDOB = new Date(petDOB);

  if (ownerName == "" || phoneNumber == "" || petName == "" || petDOB == "") {
    console.log("Please fill in all fields");
    return res.status(400).json("Please fill all fields");
  }
  if (containsNumber(ownerName) || containsNumber(petName)) {
    console.log("Name contain number.. please check it ");
    return res.status(400).json("Name contain number.. please check it  ");
  }
  if (dateDOB > today) {
    return res.status(400).json("Please check the birthday");
  }
  if (petType != "Cat" && petType != "Dog" && petType != "Parrot") {
    return res.status(400).json("Please select Dog/Cat/Parrot");
  } else {
    console.log("patient created ");

    const result = await Patient.create(request);
    return res.status(200).json({ result });
  }
}
