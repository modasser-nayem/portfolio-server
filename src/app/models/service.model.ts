import { Schema, model } from "mongoose";
import { TService } from "../interface/service.interface";

const ServiceSchema = new Schema<TService>({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
  },
});

const Service = model<TService>("Service", ServiceSchema);
export default Service;
