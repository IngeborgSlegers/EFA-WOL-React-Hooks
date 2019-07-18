import React, {useState} from 'react';
import APIURL from '../helpers/environment';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}user/signup`, { 
      method: 'POST',
      body: JSON.stringify({user:
        {
          firstName: firstName,
          lastName: lastName,
          email: email, 
          password: password
        }
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }).then(
        (response) => response.json()
    ).then((data) => {
      console.log('data', data, 'sessionToken', data.token)
      props.updateToken(data.token)
    })
  }

  return(
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input onChange={(e) => setFirstName(e.target.value)} name="firstName" required value={firstName}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input onChange={(e) => setLastName(e.target.value)} required name="lastName" value={lastName}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" value={email}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" value={password}/>
        </FormGroup>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  )
}

export default Signup;