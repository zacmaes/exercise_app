import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function CreateExerciseInfo() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
          alert(`Failed to add the exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
          <h1>Add Exercise</h1>
          <input 
              placeholder='Name' 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} />
          <input 
              placeholder='Reps' 
              type="number" 
              value={reps} 
              onChange={e => setReps(e.target.valueAsNumber)} />
          <input 
              placeholder='Weight' 
              type="number" 
              value={weight} 
              onChange={e => setWeight(e.target.valueAsNumber)} />
          {/* <input 
              placeholder='Unit' 
              type="select" 
              value={unit} 
              onChange={e => setUnit(e.target.value)} /> */}
          
          <select onChange={e => setUnit(e.target.value)}>
              <option value={unit}>{unit}</option>
              <option value ="kgs">kgs</option>
              <option value="lbs">lbs</option>
          </select>
          <input 
              placeholder='Date' 
              type="text" 
              value={date} 
              onChange={e => setDate(e.target.value)} />
          <button
              onClick={addExercise}
          >Add</button>
        </div>

    );
}

export default CreateExerciseInfo;