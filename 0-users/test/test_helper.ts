// Lib
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users_test", {
  useNewUrlParser: true
});

mongoose.connection
  .once("open", () => console.log("Good to go!"))
  .on("error", error => console.warn("Warning", error));

beforeEach(async () => {
  try {
    await mongoose.connection.collections["users"].drop();
  } catch (ex) {
    console.error("Error!", ex);
  }
});
