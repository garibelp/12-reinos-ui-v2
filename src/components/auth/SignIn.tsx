import { Button, Input } from 'antd';
import { useState } from 'react';

import { signIn } from '../../api/requests/auth';

export function SignIn() {
  var [username, setUsername] = useState<string>('');
  var [password, setPassword] = useState<string>('');
  var [loading, isLoading] = useState(false);

  function handleLogin() {
    isLoading(true)
    signIn(username, password)
      .then(r => { console.log(r) })
      .catch(ex => { console.error(ex) })
      .finally(() => isLoading(false))
  }


  return (
    <div> 
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        loading={loading}
        color='primary'
        onClick={handleLogin}
      >
        Request
      </Button>
    </div>
  );
}
