module.exports = (mongoose) => {
    const Session = mongoose.model(
      'Session',
      new mongoose.Schema({
        tattoo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tattoo', required: true },
        location: { type: String, required: true },
        start_datetime: { type: Date, required: true },
        end_datetime: { type: Date, required: true },
        status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
        created_at: { type: Date, default: Date.now }
      })
    );
  
    return Session;
  };
  