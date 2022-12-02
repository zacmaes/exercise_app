import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create a new exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date 
 * @returns A promise. Resolves to the JSON object for the document created by calling save().
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

/**
 * Find exercises that match the query parameter filter
 * @param {Object} filter 
 * @returns A promise. Resolves to and array of the JSON objects returned by calling .find() and .exec()
 */
 const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

/**
 * Updates one exercise by their _id. Will update multiple key=value pairs if entered.
 * @param {Object} filter 
 * @param {Object} update 
 * @returns A promise. Resolves to a number (either 1 or 0) representing the modified count
 */
 const updateExercises = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    // return result.modifiedCount;
    return result;
    // consider change to matchedCount
}

/**
 * Deletes one or more exercises based upon the condition object passed as a parameter
 * @param {Object} paramToDelete 
 * @returns A promise. Resolves to a number showing the amount of exercises deleted
 */
 const deleteExercises = async (paramToDelete) => {
    const result = await Exercise.deleteMany(paramToDelete);
    return result.deletedCount;
}

export {createExercise, findExercises, updateExercises, deleteExercises};
