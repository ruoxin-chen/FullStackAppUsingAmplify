import Amplify, { DataStore, Auth, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Post, Author } from "./models";

Amplify.configure(awsconfig);

document.getElementById('create-post').addEventListener('submit', async e => {
    e.preventDefault()
  
    try {
      const file = document.getElementById('img').files[0]
      await Storage.put(file.name, file) // Store it in DynamoDB, S3
      
      // Write data to the DataStore by passing an instance of a data model
      const newPost = await DataStore.save(new Post({
        description: document.getElementById('description').value, // input text in index.html
        image: file.name
      })).then(() => {
        alert("Post succeeded!") // Only when the previous code does not raise an error
        window.location.reload() // Refresh the page
      })
      console.log(newPost)
    } catch (err) {
      console.log(err)
    }
  })

const pullData = async () => {
    try {
      const posts = await DataStore.query(Post) // Query for all items
      let postsWithPic = [] // initialize an array
      for (const post of posts) {
        try {
          let img = await Storage.get(post.image) // Get image from S3
        postsWithPic.push({
          description: post.description,
          pic:img
        })
      } catch (err) {
        postsWithPic.push({
        description: post.description,
        pic: post.link
        })
      } 
      }
      const postsDiv = document.querySelector('.posts')
      postsWithPic.map(post => {
        const postDiv = document.createElement('div')
        postDiv.classList.add('post')
        const img = document.createElement('img')
        const p = document.createElement('p')
        p.innerText = post.description
        img.setAttribute('src', post.pic)
        postDiv.appendChild(img)
        postDiv.appendChild(p)
        postsDiv.appendChild(postDiv)
      })
  } catch (err) {
      console.log(err)
  }
}
  
pullData()
  
  
let currentUser = null // Create a variable

const toggleNavBar = () => {
  // if user has logged in
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden') // add 'hidden' class
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden') // remove 'hidden' class
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