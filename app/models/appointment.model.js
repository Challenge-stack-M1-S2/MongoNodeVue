module.exports = (mongoose) => {
    const Appointment = mongoose.model(
      'Appointment',
      new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
        status: { type: String, enum: ['waiting', 'finished', 'canceled'], default: 'waiting' },
        created_at: { type: Date, default: Date.now }
      })
    );
  
    return Appointment;
  };
  