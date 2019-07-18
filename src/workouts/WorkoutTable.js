import React from 'react';
import APIURL from '../helpers/environment';
import { Table, Button } from 'reactstrap';

const WorkoutTable = (props) => {
  const deleteWorkout = (workout) => {
    fetch(`${APIURL}log/${workout.id}`, {
        method: 'DELETE', 
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(() => props.fetchWorkouts())
  }

  const workoutMapper = () => {
    console.log(props.workouts);
    return props.workouts.map((workout, index) => {
      let newDate = new Date(workout.date);
      console.log(newDate)
      console.log(newDate instanceof Date);
      return(
        <tr key={index}>
          <td>{newDate.toDateString()}</td>
          <td>{workout.activity}</td>
          <td>{workout.duration}</td>
          <td>{workout.notes}</td>
          <td>
            <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
            <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
          </td>
        </tr>
      )
    })
  };

  return(
    <div>
      <h3>Workout History</h3>
      <hr/>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Duration</th>
            <th>What did you enjoy?</th>
          </tr>
        </thead>
        <tbody>
        {workoutMapper()}
        </tbody>
      </Table>
    </div>
  );
};

export default WorkoutTable;