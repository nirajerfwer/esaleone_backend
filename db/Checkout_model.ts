import mongoose, { Document, Schema } from "mongoose";

// 1. Interface for TypeScript type checking
export interface ICheckout extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  card: string;
  cardExpiry: Date;
  cvvHash?: string;
  createdAt: Date;
}

// 2. Schema definition
const CheckoutSchema: Schema = new Schema<ICheckout>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    match: [/^\d{5,6}$/, "Zip code must be 5 or 6 digits"],
  },
  card: {
    type: String,
    required: true,
    match: [/^\d{16}$/, "Must be 16 digits of card"],
  },
  cardExpiry: {
    type: Date,
    required: true,
    validate: {
      validator: function (v: Date) {
        return v > new Date();
      },
      message: "Card expiry must be a future date",
    },
  },
  cvvHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICheckout>("Checkout", CheckoutSchema);
