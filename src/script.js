import Amplify, { DataStore } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Post } from "./models";

Amplify.configure(awsconfig);

document.getElementById('create-post').addEventListener('click', async e => {
    e.preventDefault()
  
    try {
      const newPost = await DataStore.save(new Post({
        description: 'Felt cute might delete',
        link: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.sproutsocial.com%2Fuploads%2F2017%2F01%2FInstagram-Post-Ideas.png&imgrefurl=https%3A%2F%2Fsproutsocial.com%2Finsights%2Finstagram-post-ideas%2F&tbnid=Ef8eIRB65WP7xM&vet=12ahUKEwjIvsW6hq_8AhVSn3IEHdv_CsYQMygIegUIARDvAQ..i&docid=3tJIPozOzHHXUM&w=780&h=460&q=post%20image&ved=2ahUKEwjIvsW6hq_8AhVSn3IEHdv_CsYQMygIegUIARDvAQ'
      }))
      console.log(newPost)
    } catch (err) {
      console.log(err)
    }
  })
  
// let currentUser = null

// const toggleNavBar = () => {
//   if (currentUser) {
//     document.querySelector('.logged-in').classList.add('hidden')
//     document.querySelector('.logged-in').classList.add('hidden')
//     document.querySelector('#sign-out').classList.remove('hidden')
//     document.querySelector('#create-post').classList.remove('hidden')
//   } else {
//     document.querySelector('.logged-in').classList.remove('hidden')
//     document.querySelector('.logged-in').classList.remove('hidden')
//     document.querySelector('#sign-out').classList.add('hidden')
//     document.querySelector('#create-post').classList.add('hidden')
//   }
// }