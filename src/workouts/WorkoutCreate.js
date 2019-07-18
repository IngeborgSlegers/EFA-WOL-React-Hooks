import React, {useState, useEffect} from 'react';
import APIURL from '../helpers/environment';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WorkoutCreate = (props) => {
  const [date, setDate] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}log/`, { 
      method: 'POST', 
      body: JSON.stringify({log: 
        {
          date: date, 
          activity: activity, 
          duration: duration,
          notes: notes
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token 
      })
    }) 
    .then((res) => res.json())
    .then((logData) => { 
      console.log(logData);
      setDate(''); 
      setActivity('');  
      setDuration('');
      setNotes('');
      props.fetchWorkouts();
    })
  };

  return(
    <div>
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="date"/>
          <Input onChange={(e) => setDate(e.target.value)} type="date" name="date" value={date} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="activity"/>
          <Input onChange={(e) => setActivity(e.target.value)} type="select" name="activity" value={activity}>
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
          <Label htmlFor="duration"/>
          <Input onChange={(e) => setDuration(e.target.value)} type="text" name="duration" placeholder="Time spent in hours or min." value={duration}/> 
        </FormGroup>
        <FormGroup>
          <Label htmlFor="notes"/>
          <Input onChange={(e) => setNotes(e.target.value)} type="textarea" name="notes" placeholder="Notes" value={notes}/> 
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
    </div>
  )
};

export default WorkoutCreate