import React, {useState} from 'react';
import APIURL from '../helpers/environment';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import moment from 'moment';

const WorkoutEdit = (props) => {

  const [editDate, setEditDate] = useState(props.workoutToUpdate.date);
  const [editActivity, setEditActivity] = useState(props.workoutToUpdate.activity);
  const [editDuration, setEditDuration] = useState(props.workoutToUpdate.duration);
  const [editNotes, setEditNotes] = useState(props.workoutToUpdate.notes);

  let tryDate = new Date(editDate)

  const workoutUpdate = (event) => {
    // console.log('workout', workout);
    event.preventDefault();
    fetch(`${APIURL}log/${props.workoutToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        log: {
          date: editDate, 
          activity: editActivity, 
          duration: editDuration,
          notes: editNotes
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
      }) .then((res) => {
        props.fetchWorkouts();
        props.updateOff();
      })
  }
  return(
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor="date">Edit Date:</Label>
            <Input name="date" type="date" value={moment(tryDate).format('YYYY-MM-DD')} onChange={(e) => setEditDate(e.target.valueAsDate)}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="activity">Edit Activity:</Label>
            <Input type="select" name="activity" value={editActivity} onChange={(e) => setEditActivity(e.target.value)}>
            <option>Select an activity</option>
            <option value="Gardening">Gardening</option>
            <option value="Horse Riding">Horse Riding</option>
            <option value="Swimming">Swimming</option>
            <option value="Walk">Walk</option>
            <option value="Yoga">Yoga</option>
            <option value="Other">Other</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="duration">Edit Duration:</Label>
            <Input name="duration" value={editDuration} onChange={(e) => setEditDuration(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notes">Edit Notes:</Label>
            <Input name="notes" value={editNotes} onChange={(e) => setEditNotes(e.target.value)}/>
          </FormGroup>
          <Button type="submit">Update!</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
};

export default WorkoutEdit;