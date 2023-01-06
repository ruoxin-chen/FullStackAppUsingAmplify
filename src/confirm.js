import { Auth, Amplify } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#confirm-form').addEventListener('submit', async e => {
  e.preventDefault()
  // Confirmation handler
  const params = (new URL(document.location)).searchParams
  const username = params.get('username') // parse the url

  const confirm = await Auth.confirmSignUp(username, document.getElementById('confirm').value)
  window.location.href = '/sign-in.html' // sign in page

})
