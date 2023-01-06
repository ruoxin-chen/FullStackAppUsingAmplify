import Amplify, { DataStore, Auth, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Post, Author } from "./models";

Amplify.configure(awsconfig);

document.getElementById('create-post').addEventListener('submit', async e => {
    e.preventDefault()
  
    try {
      const file = document.getElementById('img').files[0]
      await Storage.put(file.name, file) // Store it in DynamoDB, S3

      const newPost = await DataStore.save(new Post({
        description: document.getElementById('description').value, // input text in index.html
        image: file.name
    }))

      console.log(newPost)
    } catch (err) {
      console.log(err)
    }
  })

  const pullData = async () => {
    try {
      const posts = await DataStore.query(Post)
      console.log(posts)
    } catch (err) {
      console.log(err)
    }
  }
  
  pullData()
  
  
let currentUser = null //Create a variable

const toggleNavBar = () => {
  // if user has logged in
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden') // remove 'hidden' in html
    document.querySelector('#create-post').classList.remove('hidden')
  } else {
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#create-post').classList.add('hidden')
  }
}

// Call toggleNavBar when users have signed in 
const getCurrentUser = async () => {
    try {
      currentUser = await Auth.currentAuthenticatedUser()
    } catch (err) {
      console.log('error getting user', err)
      currentUser = null
    }
    toggleNavBar()
  }
getCurrentUser()

// Sign out handler 
document.getElementById('sign-out').addEventListener('click', async e => {
    try {
        await Auth.signOut({ global: true });
        window.location.href = '/'
    } catch (error) {
        console.log('error signing out: ', error);
    }
}) 