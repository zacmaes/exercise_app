import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercises.filter((ex) => ex._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate("/edit");
    };

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        console.log(data);
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Your Exercises</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
        </>
    );
}

export default HomePage;
