const { default: mongoose } = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      requied: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
    },
    mpg: {
      type: Number,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    carPhoto: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const carModel = mongoose.models.car || mongoose.model("car", carSchema);
export default carModel;
