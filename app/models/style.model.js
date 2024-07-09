module.exports = (mongoose) => {
const Style = mongoose.model(
    'Style',
    new mongoose.Schema({
    style_name: { type: String, required: true }
    })
);
return Style;
}
