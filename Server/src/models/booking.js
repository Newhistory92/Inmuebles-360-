const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
	{
		startDate: {
			type: String,
			required: true,
		},
		endDate: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		guest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Guest",
		},
		property: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Property",
		},
		totalDays: {
			type: Number,
			required: true,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
		isPayed: {
			type: Boolean,
			default: false,
		},
		transactionId: {
			type: String,
		},
		status: {
			type: String,
			default: "Booked",
		},
	},
	{
		timestamps: true,
	}
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
