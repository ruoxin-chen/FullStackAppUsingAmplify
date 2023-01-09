import { Auth, Amplify } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#sign-in').addEventListener('submit', async e => {
  e.preventDefault()
  // Sign in handler
  // Parse out username and password
  const username = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  try {
    const user = await Auth.signIn(username, password) 
    // Users can only sign in after they signed up and confirmed
    window.location.href = '/'
  } catch (err) {
    console.log(err)
  }
})