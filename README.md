# redux-microblog

A blogging app that includes basic blogging functionalities such as adding, editing, and deleting posts and comments, as well as up/down voting posts. Built with React and Redux.

Collaborated with @cyhk

## Getting started

1. Clone this repo to your local machine 
```
git clone https://github.com/andrewsli/redux-microblog.git
```
2. cd into the "backend" directory, install required packages, prepare database, and start the server
```
cd backend
psql < data.sql
npm start
```
  This will start the server on port 5000

3. cd into the "frontend" directory, install required packages, then start the app
```
cd frontend
npm install
npm start
```
  This will run your app on http://localhost:3000 
<!-- 
To run tests (when we actually write them):
```
jest
``` -->

## App Information

### Routes
|Path | Component |
| :--- | :--- |
| / | Home  |
| /posts/new  | PostForm  |
| /posts/:postid  | PostDetails  |
| /:others  | NotFound  |

### Component Architecture
```
App
├─┬ components/Home
│ └── containers/TitleList
├─┬ containers/NewPost
│ └── components/PostForm
└─┬ containers/Post
  ├── components/CommentForm
  ├── components/CommentList
  ├── components/PostDisplay
  └── components/PostForm
```