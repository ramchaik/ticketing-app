import axios from 'axios';
import { useState } from 'react';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/users/signup', {
      email,
      password,
    });
    console.log(response.data);
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          type='text'
          value={email}
          className='form-control'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          value={password}
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};
