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
    // Ajoutez l'ID de l'utilisateur décodé du JWT au corps de la requête
    req.body.user_id = req.userId;
    
    const appointment = await Appointment.create(req.body);
    await Session.findByIdAndUpdate(session_id, { status: 'unavailable' }); // Met à jour le statut de la session à 'unavailable'

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