import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function ExerciseRow({ exercise, onDelete, onEdit }) {
    return (
        <>
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.date}</td>
                <td><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
                <td><MdEdit onClick={() => onEdit(exercise)} /></td>
            </tr>
        </>
    );
}

export default ExerciseRow;