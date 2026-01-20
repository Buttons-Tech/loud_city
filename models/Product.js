// models/Product.js
const ProductSchema = new mongoose.Schema({
  name: String,
  basePricePerGram: Number, // e.g., 50 Naira
  isVariableWeight: Boolean, // True for tea, False for headphones
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isApproved: { type: Boolean, default: false }, // Admin must approve
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude] for the map
  }
});
ProductSchema.index({ location: '2dsphere' }); // Critical for the "Vendor on Map" feature