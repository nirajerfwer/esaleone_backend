import mongoose, { Document, Schema } from 'mongoose';

// 1. TypeScript Interface
export interface IProduct extends Document {
  images: string[];
  title: string;
  description: string;
  price: number;
  colors: string[];
  sizes: number[];
  quantitys: number;
  createdAt: Date;
}

// 2. Mongoose Schema
const ProductSchema: Schema = new Schema<IProduct>({
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.length > 0,
      message: 'At least one image is required'
    }
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  colors: {
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.length > 0,
      message: 'At least one color is required'
    }
  },
  sizes: {
    type: [Number],
    required: true,
    validate: {
      validator: (arr: number[]) => arr.length > 0,
      message: 'At least one size is required'
    }
  },
  quantitys: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 3. Export the model
export default mongoose.model<IProduct>('Product', ProductSchema);
