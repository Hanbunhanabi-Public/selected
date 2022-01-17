TM016-Create-Backend-Register-Login.

The following instructions are meant to be done in POSTMAN.

### Create a user:

- Request type: POST:
  \*Request URL: localhost:5000/users

* Headers:
  - Key: Content-Type
  - Value: application/json
* Body:

- Input type: Raw
- example input:

```
{	"name": "Ahmed Kiddwai",
	"email": "tacos4breakfast@gmail.com",
	"password": "sdsddsfdsffdsfdsfs"
}
```

- Response:

  - On success return a jwt token:

  ```
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU2NDFmMmUwZTBiMGYxMmRkZWFmOGE2In0sImlhdCI6MTU4MzYxOTg4NiwiZXhwIjoxNTgzNjU1ODg2fQ.IroZq0nj10YVAw9EjQW0QqbO1nZXRiwbymzc15MCLBw"
  }
  ```

  - On failure - User Already exists:

  ```
  {
  "error": [
     {
         "msg": "User already exists"
     }
   ]
  }
  ```

  - On failure - Missing or invalid creteria - this example is for a password but similar for invalid email or missing field all together:

  ```
  {
  "errors": [
     {
         "value": "",
         "msg": "Please enter a valid password",
         "param": "password",
         "location": "body"
     }
   ]
  }
  ```

### Validating a User

- The GET route for user requires the get request to be authenticated via a jwt. This could be added to any other route in the future.

- Request type: GET:
  \*Request URL: localhost:5000/auth

* Headers:

  - Key: Content-Type
  - Value: application/json

  - Key: x-auth-token
  - Value: **THE JWT TOKEN ABOVE**

```

Returns:
{
    "_id": "5e64215f0e0b0f12ddeaf8a8",
    "name": "Connor Bean",
    "email": "connorlikesbeer@gmail.com",
    "date": "2020-03-07T22:34:07.091Z",
    "__v": 0
}
```

### Checking if a user exists and has valid credentials (Login)

- post to localhost:5000/auth
- include just the content type JWT token isn't needed.
- body needs a username and password.

NB: Notice how password isn't here - we don't even store user's passwords.
