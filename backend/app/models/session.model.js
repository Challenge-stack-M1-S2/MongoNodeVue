const geocoder = require('../utils/geocoder');

module.exports = (mongoose) => {
  const SessionSchema = new mongoose.Schema({
    tattoo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tattoo', required: true },
    location: { 
      type: { 
        type: String, 
        enum: ['Point'], 
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    start_datetime: { type: Date, required: true },
    end_datetime: { type: Date, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    created_at: { type: Date, default: Date.now }
  });

  // GeoCode & create location
  SessionSchema.pre('save', async function(next) {
    if (!this.isModified('address')) {
      return next();
    }

    try {
      const loc = await geocoder.geocode(this.address);
      this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
      };
      this.address = undefined;
      next();
    } catch (error) {
      console.error('Error during geocoding:', error);
      next(error);
    }
  });

  const Session = mongoose.model('Session', SessionSchema);
  return Session;
};
