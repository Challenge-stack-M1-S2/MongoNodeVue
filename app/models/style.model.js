module.exports = (mongoose) => {
const styleSchema = mongoose.Schema({
    style_name: { type: String, required: true }
});
return styleSchema;
}
