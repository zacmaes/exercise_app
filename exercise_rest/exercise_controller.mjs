import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';


const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


const isBodyValid = (name, reps, weight, unit, date) => {
    if (name === undefined || reps === undefined || weight === undefined || unit === undefined || date === undefined){
        // console.log("missing property")
        return false;
    } else if (name === null || name.trim() === "") {
        // console.log("empty or null string name")
        return false;
    } else if (typeof reps !== "number" || reps <= 0) {
        // console.log("reps NaN or less than 0")
        return false;
    } else if (typeof weight !== "number" || weight <= 0) {
        // console.log("weight NaN or less than 0")
        return false;
    } else if (unit !== "kgs" && unit !== "lbs") {
        // console.log("unit not kgs or lbs")
        return false;
    } else if (!isDateValid(date)) {
        // console.log("invalid date")
        return false;
    }
    // console.log("EVERYTHING WORKS...")
    return true;
}

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    if (isBodyValid(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)){
        try {
            const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
            res.set('Content-Type', 'application/json');
            res.status(201).json(exercise);
            
        } catch (error) {
            // request error (from A7)
            console.error(error);
            res.status(400).json({ Error: 'Request Failed' });
        }
    } else {
        // Body invalid if isBodyValid() returns False
        res.set('Content-Type', 'application/json');
        res.status(400).json({ Error: 'Invalid request' });
    }
    
        
    
    // res.status(501).send({ Error: "Not implemented yet || app.post('/exercises'" });
}));

/**
 * Retrieve All exercises. 
 */
 app.get('/exercises', asyncHandler(async (req, res) => {
    try {
        const filter = {};
        const result = await exercises.findExercises(filter);
        res.set('Content-Type', 'application/json');
        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.get('/exercises'" });
}));

/**
 * Retrive one exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    try {
        const filter = { _id: req.params._id };
        const result = await exercises.findExercises(filter);
        // result[0] != null -- checks for undefined as well... might cause issue later??
        if (result[0] != null) {
            res.set('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.set('Content-Type', 'application/json');
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.get('/exercises/:_id'" });
}));

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    if (isBodyValid(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)) {
        try {
            const update = {
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            };
            // const resultVal = await exercises.updateExercises({_id: req.params._id}, update);
            const updateResult = await exercises.updateExercises({_id: req.params._id}, update);


            // const returnObj = { _id: req.params._id };

            // if (updateResult.matchedCount > 0 && updateResult.modifiedCount > 0) {
            if (updateResult.matchedCount > 0) {
            
                // returnObj.name = req.body.name;
                // returnObj.reps = req.body.reps;
                // returnObj.weight = req.body.weight;
                // returnObj.unit = req.body.unit;
                // returnObj.date = req.body.date;

                // res.set('Content-Type', 'application/json');
                // res.status(200).json(returnObj);
            
            //----get code========
            
                const filter = { _id: req.params._id };
                const result = await exercises.findExercises(filter);
                // result[0] != null -- checks for undefined as well... might cause issue later??
                if (result[0] != null) {
                    res.set('Content-Type', 'application/json');
                    res.status(200).json(result[0]);
                } else {
                    res.set('Content-Type', 'application/json');
                    res.status(404).json({ Error: 'ID Not found with .get() inside of .put()' });
                }
            //===========================
            
            } else {
                res.set('Content-Type', 'application/json');
                res.status(404).json({ Error: 'Not Found' });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        }
    } else {
        // Body invalid if isBodyValid() returns False
        res.set('Content-Type', 'application/json');
        res.status(400).json({ Error: 'Invalid request' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.put('/exercises/:_id'" });
}));

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    try {
        const deleteConditions = { _id: req.params._id };
        const deleteVal = await exercises.deleteExercises(deleteConditions);
        if (deleteVal === 1) {
            res.status(204).send();
        } else {
            res.set('Content-Type', 'application/json');
            res.status(404).json({ Error: 'Not found' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    }
    // res.status(501).send({ Error: "Not implemented yet || app.delete('/exercises/:_id'" });
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});