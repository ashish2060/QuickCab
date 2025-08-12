import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car",
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
    pickUpDate: {
      type: Date,
      required: true,
    },
    dropOffDate: {
      type: Date,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    dropOffTime: {
      type: String,
      required: true,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingModel =
  mongoose.models.bookings || mongoose.model("bookings", bookingSchema);
export default bookingModel;
