import mongoose from "mongoose";

const cabSchema = new mongoose.Schema(
  {
    pickupData: {
      type: Object,
      required: true,
    },
    dropoffData: {
      type: Object,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Declined", "Pending"],
      default: "Pending",
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const cabModel =
  mongoose.models.cabRide || mongoose.model("cabRide", cabSchema);
export default cabModel;
