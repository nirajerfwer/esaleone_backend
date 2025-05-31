import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  Products: {
    ProductId: Types.ObjectId;
    title: string;
    size: number;
    color: string;
    quantity: number;
    price: number;
  }[];
  Totalprice: number;
  SubTotal: number;
  Tax: number;
  CheckOutId: Types.ObjectId;
  createdAt: Date;
}

const ProductItemSchema = new Schema(
  {
    ProductId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    size: { type: Number, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    Products: [ProductItemSchema],
    Totalprice: { type: Number, required: true },
    SubTotal: { type: Number, required: true },
    Tax: { type: Number, required: true },
    CheckOutId: { type: Schema.Types.ObjectId, ref: 'Checkout', required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
