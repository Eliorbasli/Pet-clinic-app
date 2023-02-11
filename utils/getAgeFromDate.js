// export const connectMongo = async () =>
//   mongoose.connect(
//     "mongodb+srv://Admin:7kWN9s91dLYRt2GT@cluster0.yo6zbcr.mongodb.net/?retryWrites=true&w=majority"
//   );

export function getAgeFromDate(dateString) {
  var today = new Date();
  const birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
