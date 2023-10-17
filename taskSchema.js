const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskBody: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // Use lowercase "timestamps" here
});
const taskCollection = mongoose.model("Task", taskSchema);

module.exports = {
    taskCollection
};
