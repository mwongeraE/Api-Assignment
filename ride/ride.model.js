const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Schema.Types.Boolean.convertToFalse.add('Done');
mongoose.Schema.Types.Boolean.convertToTrue.add('Ongoing');

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const schema = new Schema({
  passenger: { type: String, required: true },
  driver: { type: String, required: true },
  pickupLocation: {
    type: pointSchema,
    required: true
  },
  destinationLocation: {
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
  },
  status: { type: Boolean,  required: true },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Ride", schema);