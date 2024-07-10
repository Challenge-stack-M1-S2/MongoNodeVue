const db = require("../models");
const Appointment = db.appointment;
const Session = db.session;

//GET Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user_id").populate("session_id");
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//POST Appointment
exports.addAppointments = async (req, res) => {
    try {
      const { session_id } = req.body;
      const appointment = await Appointment.create(req.body);
      await Session.findByIdAndUpdate(session_id, { status: 'unavailable' }); // Update the session status to unavailable
  
      return res.status(200).json({
        success: true,
        data: appointment
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //GET Appointment by user_id
  exports.getUserAppointments = async (req, res) => {
    try {
      const userId = req.userId;
      const appointments = await Appointment.find({ user_id: userId }).populate('session_id');
      
      return res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };