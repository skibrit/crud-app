# crud-app

it's a simple test app that has two basic router. User & post. Login, registration can be done via user router.
Authenticated users can create/update post through post router

### Route user:
#### GET api/user?src='desc' [Public]
returns all the users in the database. 
example response-
``` 
 [{
    username: 'username',
    regDate: 'regDate',
    loginTime: 'loginTime'
 },{
    username: 'username',
    regDate: 'regDate',
    loginTime: 'loginTime'
 },...]
 ```
#### GET api/user/:username [Public]
returns a single user against provided username.
example response-
```
 {
    username: 'username',
    regDate: 'regDate',
    loginTime: 'loginTime'
 }
 ```
#### POST api/user/login [Public]
allows user to login and sends a jwt token,
example response-
```
 {
   token:'token'
 }
 ```
#### POST api/user/register [Public]
allows user to register and sends a jwt token.
example response-
```
 {
   token:'token'
 }
 ```
#### DELETE api/user [Private]
deletes an existing user including all their posts from the database
 
 
### Route post :
#### GET api/post?sort='desc' [Public]
returns all the posts in the database. 
example response-
```
 [{
    isEdited": false,
   _id": "5dd44aaae5122a5fec7bbd7e,
    content: "hello world",
   postedBy: {
            _id: "5dd44a76e5122a5fec7bbd7c",
            username: "userme"
        },
   postTime: "2019-11-19T20:03:54.157Z"
 },{
   isEdited": false,
   _id": "5dd44aaae5122a5fec7bbd7e,
    content: "hello world",
   postedBy: {
            _id: "5dd44a76e5122a5fec7bbd7c",
            username: "userme2"
        },
   postTime: "2019-11-19T20:03:54.157Z"
 },...]
 ```
#### POST api/post/:id? [Private]
will add a new post in the database. If an existing post found based on the given id then it will update that post.
example input- 
```
 {
    content: 'hello world',
 }
 ```
#### GET /api/post/:id  [Public]
returns a single post against provided id
example response-
```
 {
   isEdited": false,
   _id": "5dd44aaae5122a5fec7bbd7e,
    content: "hello world",
   postedBy: {
            _id: "5dd44a76e5122a5fec7bbd7c",
            username: "userme"
        },
   postTime: "2019-11-19T20:03:54.157Z"
 }
 ```
#### DELETE post/:id [Private]
deletes a post from the database based on the provided id
