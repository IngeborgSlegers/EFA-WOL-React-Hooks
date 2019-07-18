import React, {useState} from 'react';
import APIURL from '../helpers/environment';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'; //1

const Login = (props) => {
  const [email, setEmail] = useState(''); //2
  const [password, setPassword] = useState(''); //2
 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}user/signin`, { //1
      method: 'POST', //2
      body: JSON.stringify({user:{email: email, password: password}}), //3
      headers: new Headers({
          'Content-Type': 'application/json' //4
      })
    }).then(
        (response) => response.json() //5
    ).then((data) => {
        props.updateToken(data.sessionToken) //6
    })
  }

  return(
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} >
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password" value={password}/>
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login;