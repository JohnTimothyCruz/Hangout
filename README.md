# Meetup Clone

## Database Schema Design

![meetup-dbdiagram]

[meetup-dbdiagram]: ./meetup_dbdiagram.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## GROUPS

### Get all Groups

Returns all the groups.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Groups":[
        {
          "id": 1,
          "organizerId": 1,
          "name": "Evening Tennis on the Water",
          "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          "type": "In person",
          "private": true,
          "city": "New York",
          "state": "NY",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "numMembers": 10,
          "previewImage": "image url",
        }
      ]
    }
    ```

### Get all Groups joined or organized by the Current User

Returns all the groups.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/groups/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Groups":[
        {
          "id": 1,
          "organizerId": 1,
          "name": "Evening Tennis on the Water",
          "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          "type": "In person",
          "private": true,
          "city": "New York",
          "state": "NY",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "numMembers": 10,
          "previewImage": "image url",
        }
      ]
    }
    ```

### Get details of a Group from an id

Returns the details of a group specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups/:groupId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "organizerId": 1,
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "numMembers": 10,
      "GroupImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
      "Organizer": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "Venues": [
        {
          "id": 1,
          "groupId": 1,
          "address": "123 Disney Lane",
          "city": "New York",
          "state": "NY",
          "lat": 37.7645358,
          "lng": -122.4730327
        }
      ]
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Group

Creates and returns a new group.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/groups
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "organizerId": 1,
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name must be 60 characters or less",
        "about": "About must be 50 characters or more",
        "type": "Type must be 'Online' or 'In person'",
        "private": "Private must be a boolean",
        "city": "City is required",
        "state": "State is required",
      }
    }
    ```

### Add an Image to a Group based on the Group's id

Create and return a new image for a group specified by id.

* Require Authentication: true
* Require proper authorization: Current User must be the organizer for the group
* Request
  * Method: POST
  * URL: /api/groups/:groupId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",
      "preview": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "preview": true
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Edit a Group

Updates and returns an existing group.

* Require Authentication: true
* Require proper authorization: Group must belong to the current user
* Request
  * Method: PUT
  * URL: /api/groups/:groupId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "organizerId": 1,
      "name": "Evening Tennis on the Water",
      "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
      "type": "In person",
      "private": true,
      "city": "New York",
      "state": "NY",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name must be 60 characters or less",
        "about": "About must be 50 characters or more",
        "type": "Type must be 'Online' or 'In person'",
        "private": "Private must be a boolean",
        "city": "City is required",
        "state": "State is required",
      }
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Group

Deletes an existing group.

* Require Authentication: true
* Require proper authorization: Group must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/groups/:groupId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

## VENUES

### Get All Venues for a Group specified by its id

Returns all venues for a group specified by its id

* Require Authentication: true
* Require Authentication: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: GET
  * URL: /api/groups/:groupId/venues
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "Venues": [
      {
        "id": 1,
        "groupId": 1,
        "address": "123 Disney Lane",
        "city": "New York",
        "state": "NY",
        "lat": 37.7645358,
        "lng": -122.4730327,
      }
    ]
  }

  ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Create a new Venue for a Group specified by its id

Creates and returns a new venue for a group specified by its id

* Require Authentication: true
* Require Authentication: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: POST
  * URL: /api/groups/:groupId/venues
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "address": "123 Disney Lane",
    "city": "New York",
    "state": "NY",
    "lat": 37.7645358,
    "lng": -122.4730327,
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 1,
    "groupId": 1,
    "address": "123 Disney Lane",
    "city": "New York",
    "state": "NY",
    "lat": 37.7645358,
    "lng": -122.4730327,
  }
  ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
      }
    }
    ```

### Edit a Venue specified by its id

Edit a new venue specified by its id

* Require Authentication: true
* Require Authentication: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: PUT
  * URL: /api/venues/:venueId
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "address": "123 Disney Lane",
    "city": "New York",
    "state": "NY",
    "lat": 37.7645358,
    "lng": -122.4730327,
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 1,
    "groupId": 1,
    "address": "123 Disney Lane",
    "city": "New York",
    "state": "NY",
    "lat": 37.7645358,
    "lng": -122.4730327,
  }
  ```

* Error response: Couldn't find a Venue with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Venue couldn't be found",
      "statusCode": 404
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
      }
    }
    ```

## EVENTS

### Get all Events

Returns all the events.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/events
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Events": [
        {
          "id": 1,
          "groupId": 1,
          "venueId": null,
          "name": "Tennis Group First Meet and Greet",
          "type": "Online",
          "startDate": "2021-11-19 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 8,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": null,
        },
        {
          "id": 1,
          "groupId": 1,
          "venueId": 1,
          "name": "Tennis Singles",
          "type": "In Person",
          "startDate": "2021-11-20 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 4,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": {
            "id": 1,
            "city": "New York",
            "state": "NY",
          },
        },
      ]
    }
    ```

### Get all Events of a Group specified by its id

Returns all the events of a group specified by its id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups/:groupId/events
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Events": [
        {
          "id": 1,
          "groupId": 1,
          "venueId": null,
          "name": "Tennis Group First Meet and Greet",
          "type": "Online",
          "startDate": "2021-11-19 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 8,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": null,
        },
        {
          "id": 1,
          "groupId": 1,
          "venueId": 1,
          "name": "Tennis Singles",
          "type": "In Person",
          "startDate": "2021-11-20 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 4,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": {
            "id": 1,
            "city": "New York",
            "state": "NY",
          },
        },
      ]
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Get details of an Event specified by its id

Returns the details of an event specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/events/:eventId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "groupId": 1,
      "venueId": 1,
      "name": "Tennis Group First Meet and Greet",
      "description": "First meet and greet event for the evening tennis on the water group! Join us online for happy times!",
      "type": "Online",
      "capacity": 10,
      "price": 18.50,
      "startDate": "2021-11-19 20:00:00",
      "endDate": "2021-11-19 22:00:00",
      "numAttending": 8,
      "Group": {
        "id": 1,
        "name": "Evening Tennis on the Water",
        "private": true,
        "city": "New York",
        "state": "NY"
      },
      "Venue": {
        "id": 1,
        "address": "123 Disney Lane",
        "city": "New York",
        "state": "NY",
        "lat": 37.7645358,
        "lng": -122.4730327,
      },
      "EventImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
    }
    ```

* Error response: Couldn't find a Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

### Create an Event for a Group specified by its id

Creates and returns a new event for a group specified by its id

* Require Authentication: true
* Require Authorization: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: POST
  * URL: /api/groups/:groupId/events
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "venueId": 1,
      "name": "Tennis Group First Meet and Greet",
      "type": "Online",
      "capacity": 10,
      "price": 18.50,
      "description": "The first meet and greet for our group! Come say hello!",
      "startDate": "2021-11-19 20:00:00",
      "endDate": "2021-11-19 22:00:00",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "groupId": 1,
      "venueId": 1,
      "name": "Tennis Group First Meet and Greet",
      "type": "Online",
      "capacity": 10,
      "price": 18.50,
      "description": "The first meet and greet for our group! Come say hello!",
      "startDate": "2021-11-19 20:00:00",
      "endDate": "2021-11-19 22:00:00",
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "venueId": "Venue does not exist",
        "name": "Name must be at least 5 characters",
        "type": "Type must be Online or In person",
        "capacity": "Capacity must be an integer",
        "price": "Price is invalid",
        "description": "Description is required",
        "startDate": "Start date must be in the future",
        "endDate": "End date is less than start date",
      }
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Add an Image to a Event based on the Event's id

Create and return a new image for an event specified by id.

* Require Authentication: true
* Require proper authorization: Current User must be an attendee, host, or co-host of the event
* Request
  * Method: POST
  * URL: /api/events/:eventId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",
      "preview": false
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "preview": false
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

### Edit an Event specified by its id

Edit and returns an event specified by its id

* Require Authentication: true
* Require Authorization: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: PUT
  * URL: /api/events/:eventId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "venueId": 1,
      "name": "Tennis Group First Meet and Greet",
      "type": "Online",
      "capacity": 10,
      "price": 18.50,
      "description": "The first meet and greet for our group! Come say hello!",
      "startDate": "2021-11-19 20:00:00",
      "endDate": "2021-11-19 22:00:00",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "groupId": 1,
      "venueId": 1,
      "name": "Tennis Group First Meet and Greet",
      "type": "Online",
      "capacity": 10,
      "price": 18.50,
      "description": "The first meet and greet for our group! Come say hello!",
      "startDate": "2021-11-19 20:00:00",
      "endDate": "2021-11-19 22:00:00",
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "venueId": "Venue does not exist",
        "name": "Name must be at least 5 characters",
        "type": "Type must be Online or In person",
        "capacity": "Capacity must be an integer",
        "price": "Price is invalid",
        "description": "Description is required",
        "startDate": "Start date must be in the future",
        "endDate": "End date is less than start date",
      }
    }
    ```

* Error response: Couldn't find a Venue with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Venue couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

### Delete an Event specified by its id

Delete an event specified by its id

* Require Authentication: true
* Require Authorization: Current User must be the organizer of the group or a member of
  the group with a status of "co-host"
* Request
  * Method: DELETE
  * URL: /api/events/:eventId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

## MEMBERSHIPS

### Get all Members of a Group specified by its id

Returns the members of a group specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups/:groupId/members
  * Body: none

* Successful Response: If you ARE the organizer or a co-host of the group. Shows
  all members and their statuses.
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Members": [
        {
          "id": 2,
          "firstName": "Clark",
          "lastName": "Adams",
          "Membership": {
            "status": "co-host"
          },
        },
        {
          "id": 3,
          "firstName": "John",
          "lastName": "Smith",
          "Membership": {
            "status": "member"
          },
        },
        {
          "id": 4,
          "firstName": "Jane",
          "lastName": "Doe",
          "Membership": {
            "status": "pending"
          },
        },
      ]
    }
    ```

* Successful Response: If you ARE NOT the organizer of the group. Shows only
  members that don't have a status of "pending".
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Members": [
        {
          "id": 2,
          "firstName": "Clark",
          "lastName": "Adams",
          "Membership": {
            "status": "co-host"
          },
        },
        {
          "id": 3,
          "firstName": "John",
          "lastName": "Smith",
          "Membership": {
            "status": "member"
          },
        },
      ]
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Request a Membership for a Group based on the Group's id

Request a new membership for a group specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/groups/:groupId/membership
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "memberId": 2,
      "status": "pending"
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Current User already has a pending membership
  for the group
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Membership has already been requested",
      "statusCode": 400
    }
    ```

* Error response: Current User is already an accepted member of the group
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User is already a member of the group",
      "statusCode": 400
    }
    ```

### Change the status of a membership for a group specified by id

Change the status of a membership for a group specified by id.

* Require Authentication: true
* Require proper authorization:
  * To change the status from "pending" to "member":
    * Current User must already be the organizer or have a membership to the
      group with the status of "co-host"
  * To change the status from "member" to "co-host":
    * Current User must already be the organizer
* Request
  * Method: PUT
  * URL: /api/groups/:groupId/membership
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "memberId": 2,
      "status": "member"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "groupId": 1,
      "memberId": 2,
      "status": "member"
    }
    ```

* Error response: If changing the membership status to "pending".
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validations Error",
      "statusCode": 400,
      "errors": {
        "status" : "Cannot change a membership status to pending"
      }
    }
    ```

* Error response: Couldn't find a User with the specified memberId
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "memberId": "User couldn't be found"
      }
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: If membership does not exist
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Membership between the user and the group does not exits",
      "statusCode": 404
    }
    ```

### Delete membership to a group specified by id

Delete a membership to a group specified by id.

* Require Authentication: true
* Require proper authorization: Current User must be the host of the group, or
  the user whose membership is being deleted
* Request
  * Method: DELETE
  * URL: /api/groups/:groupId/membership
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "memberId": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted membership from group"
    }
    ```

* Error response: Couldn't find a User with the specified memberId
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "memberId": "User couldn't be found"
      }
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Membership does not exist for this User
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Membership does not exist for this User",
      "statusCode": 404
    }
    ```

## ATTENDEES

### Get all Attendees of an Event specified by its id

Returns the attendees of an event specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/events/:eventId/attendees
  * Body: none

* Successful Response: If you ARE the organizer of the group or a member of the
  group with a status of "co-host". Shows all attendees including those with a
  status of "pending".
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Attendees": [
        {
          "id": 2,
          "firstName": "Clark",
          "lastName": "Adams",
          "Attendance": {
            "status": "member"
          },
        },
        {
          "id": 3,
          "firstName": "John",
          "lastName": "Smith",
          "Attendance": {
            "status": "waitlist"
          },
        },
        {
          "id": 4,
          "firstName": "Jane",
          "lastName": "Doe",
          "Attendance": {
            "status": "pending"
          },
        },
      ]
    }
    ```

* Successful Response: If you ARE NOT the organizer of the group or a member of
  the group with a status of "co-host". Shows all members that don't have a
  status of "pending".
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Attendees": [
        {
          "id": 2,
          "firstName": "Clark",
          "lastName": "Adams",
          "Attendance": {
            "status": "member"
          },
        },
        {
          "id": 3,
          "firstName": "John",
          "lastName": "Smith",
          "Attendance": {
            "status": "waitlist"
          },
        },
      ]
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

### Request to Attend an Event based on the Event's id

Request attendance for an event specified by id.

* Require Authentication: true
* Require Authorization: Current User must be a member of the group
* Request
  * Method: POST
  * URL: /api/events/:eventId/attendance
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "userId": 2,
      "status": "pending"
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Current User already has a pending attendance
  for the event
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Attendance has already been requested",
      "statusCode": 400
    }
    ```

* Error response: Current User is already an accepted attendee of the event
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User is already an attendee of the event",
      "statusCode": 400
    }
    ```

### Change the status of an attendance for an event specified by id

Change the status of an attendance for an event specified by id.

* Require Authentication: true
* Require proper authorization: Current User must already be the organizer or
  have a membership to the group with the status of "co-host"
* Request
  * Method: PUT
  * URL: /api/events/:eventId/attendance
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "userId": 2,
      "status": "attending"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "eventId": 1,
      "userId": 2,
      "status": "attending"
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: If changing the attendance status to "pending".
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Cannot change an attendance status to pending",
      "statusCode": 400
    }
    ```

* Error response: If attendance does not exist
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Attendance between the user and the event does not exist",
      "statusCode": 404
    }
    ```

### Delete attendance to an event specified by id

Delete an attendance to an event specified by id.

* Require Authentication: true
* Require proper authorization: Current User must be the host of the group, or
  the user whose attendance is being deleted
* Request
  * Method: DELETE
  * URL: /api/events/:eventId/attendance
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "userId": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted attendance from event"
    }
    ```

* Error response: Couldn't find an Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Attendance does not exist for this User
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Attendance does not exist for this User",
      "statusCode": 404
    }
    ```

* Error response: Only the User or organizer may delete an Attendance
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Only the User or organizer may delete an Attendance",
      "statusCode": 403
    }
    ```

## IMAGES

### Delete an Image for a Group

Delete an existing image for a Group.

* Require Authentication: true
* Require proper authorization: Current user must be the organizer or "co-host"
  of the Group
* Request
  * Method: DELETE
  * URL: /api/group-images/:imageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group Image couldn't be found",
      "statusCode": 404
    }
    ```


### Delete an Image for an Event

Delete an existing image for an Event.

* Require Authentication: true
* Require proper authorization: Current user must be the organizer or "co-host"
  of the Group that the Event belongs to
* Request
  * Method: DELETE
  * URL: /api/event-images/:imageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event Image couldn't be found",
      "statusCode": 404
    }
    ```


### Add Query Filters to Get All Events

Return events filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/events
  * Query Parameters
    * page: integer, minimum: 1, maximum: 10, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * name: string, optional
    * type: string, optional
    * startDate: string, optional
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Events": [
        {
          "id": 1,
          "groupId": 1,
          "venueId": null,
          "name": "Tennis Group First Meet and Greet",
          "type": "Online",
          "startDate": "2021-11-19 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 8,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": null,
        },
        {
          "id": 1,
          "groupId": 1,
          "venueId": 1,
          "name": "Tennis Singles",
          "type": "In Person",
          "startDate": "2021-11-20 20:00:00",
          "endDate": "2021-11-19 22:00:00",
          "numAttending": 4,
          "previewImage": "image url",
          "Group": {
            "id": 1,
            "name": "Evening Tennis on the Water",
            "city": "New York",
            "state": "NY"
          },
          "Venue": {
            "id": 1,
            "city": "New York",
            "state": "NY",
          },
        },
      ]
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1",
        "name": "Name must be a string",
        "type": "Type must be 'Online' or 'In Person'",
        "startDate": "Start date must be a valid datetime",
      }
    }
    ```

# Kanban Project Board Cards

The following cards will guide the implementation of the Meetup API. Each
section should be copied into it's own card on the Kanban project board.
Each feature's progress should be tracked by checking off requirements as they
are met and progressing the cards from the `Backlog`, `Next Tasks`,
`In Progress`, `In Review`, and `Accepted` columns.


## Kanban Cards

Copy each of the following sections into its own card on a Kanban board for the
project. Github Kanban boards use markdown formatting, allowing these sections
to be copied directly:


### Authentication Required

All endpoints that require a current user to be logged in receive a standard
authentication response.

- [ ] Authentication middleware responds with error status 401 when
  authentication is not provided


### Authorization Required

All endpoints that require a current user to have the correct role(s) or
permission(s) receive a standard authorization response.

- [ ] Authorization middleware responds with error status 403 when
  an authenticated user does not have the correct role(s) or permission(s)


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- [ ] New user exists in the database after request
- [ ] Successful response includes newly created `id`, `firstName`, `lastName`,
  `email`, and `token`
- [ ] Error response with status 403 is given when the specified email already
exists
- [ ] Error response with status 400 is given when body validations for the
  `email`, `firstName`, or `lastName` are violated


### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- [ ] Successful response includes the user's `id`, `firstName`, `lastName`,
  `email`, and `token`
- [ ] Error response with status 401 is given when invalid credentials are given
- [ ] Error response with status 400 is given when body validations for the
  `email`, `firstName`, or `lastName` are violated


### Get the Current User

Returns the information about the current user that is logged in.

- [ ] An authenticated user is required for a successful response
- [ ] Successful response includes the user's `id`, `firstName`, `lastName`,
  `email`, and `token`


### Get all Groups

Returns all groups.

- [ ] Seed data exists in the database for groups to be returned.
- [ ] Successful response includes each group in the database.
- [ ] Group data returned includes the `id`, `organizerId`, `name`, `about`,
  `type`, `private`, `city`, `state`, `createdAt`, `updatedAt`, `numMembers`,
  and `previewImage`


### Get all Groups joined or organized by the Current User

Returns all the groups either created by the current user or those where the
current user has a membership.

- [ ] An authenticated user is required for a successful response
- [ ] Successful response includes only groups created or joined by the current
  user
- [ ] Group data returned includes the `id`, `organizerId`, `name`, `about`,
  `type`, `private`, `city`, `state`, `createdAt`, `updatedAt`, `numMembers`,
  and `previewImage`


### Get details of a Group from an id

Returns the details of a group specified by its id.

- [ ] Successful response includes data only for the specified group
- [ ] Group data returned includes the `id`, `organizerId`, `name`, `about`,
  `type`, `private`, `city`, `state`, `createdAt`, `updatedAt`, and `numMembers`
- [ ] Group data returns associated data for `GroupImages`, an array of image
  data including the `id`, `url`, and `preview`
- [ ] Group data returns associated data for `Organizer`, including the `id`,
  `firstName`, and `lastName`
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Create a Group

Creates and returns a new group.

- [ ] An authenticated user is required for a successful response
- [ ] New group exists in the database after request
- [ ] Group data returned includes the `id`, `organizerId`, `name`, `about`,
  `type`, `private`, `city`, `state`, `createdAt`, and `updatedAt`
- [ ] Error response with status 400 is given when body validations for the
  `name`, `about`, `type`, `private`, `city`, or `state` are violated


### Add an Image to a Group based on the Group's id

Create and return a new image for a group specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only the organizer of the group is authorized to add an image
- [ ] New image exists in the database after request
- [ ] Image data returned includes the `id`, `url`, and `preview`
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Edit a Group

Updates and returns an existing group.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group is authorized to edit
- [ ] Group record is updated in the database after request
- [ ] Group data returned includes the `id`, `organizerId`, `name`, `about`,
  `type`, `private`, `city`, `state`, `createdAt`, and `updatedAt`
- [ ] Error response with status 400 is given when body validations for the
  `name`, `about`, `type`, `private`, `city`, or `state` are violated
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Delete a Group

Deletes an existing group.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group is authorized to delete
- [ ] Group record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Get all Venues for a Group specified by id

Returns all venues for a group specified by its id.

- [ ] Seed data exists in the database for venues to be returned.
- [ ] Successful response includes each venue for a group in the database.
- [ ] Venue data returned includes `id`, `groupId`, `address`, `city`, `state`,
  `lat`, and `lng`


### Create a new Venue for a Group specified by its id

Creates and returns a new venue for a group specified by its id

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to create a venue
- [ ] New venue exists in the database after request
- [ ] Venue data returned includes `id`, `groupId`, `address`, `city`, `state`,
  `lat`, and `lng`
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`
- [ ] Error response with status 400 is given when body validations for the
  `address`, `city`, `state`, `lat`, or `lng` are violated


### Edit a Venue specified by its id

Edit a new venue specified by its id

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to edit a venue
- [ ] Venue record is updated in the database after request
- [ ] Venue data returned includes `id`, `groupId`, `address`, `city`, `state`,
  `lat`, and `lng`
- [ ] Error response with status 404 is given when a venue does not exist with
  the provided `id`
- [ ] Error response with status 400 is given when body validations for the
  `address`, `city`, `state`, `lat`, or `lng` are violated

### Get all Events

Returns all the events.

- [ ] Seed data exists in the database for events to be returned.
- [ ] Successful response includes each event in the database.
- [ ] Event data returned includes the `id`, `groupId`, `venueId`, `name`,
  `type`, `startDate`, `endDate`, and `previewImage`
- [ ] Event data returned includes aggregate data for `numAttending`
- [ ] Event data returned includes associated `Group` data, including `id`,
  `name`, `city`, and `state`
- [ ] Event data returned includes associated `Venue` data, if any, including
  `id`, `city`, and `state`


### Get all Events of a Group specified by its id

Returns all the events of a group specified by its id

- [ ] Seed data exists in the database for events to be returned.
- [ ] Successful response includes only events for the specified group
- [ ] Event data returned includes the `id`, `groupId`, `venueId`, `name`,
  `type`, `startDate`, `endDate`, and `previewImage`
- [ ] Event data returned includes aggregate data for `numAttending`
- [ ] Event data returned includes associated `Group` data, including `id`,
  `name`, `city`, and `state`
- [ ] Event data returned includes associated `Venue` data, if any, including
  `id`, `city`, and `state`
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Get details of an Event specified by its id

Returns the details of an event specified by its id.

- [ ] Successful response includes data only for the specified event
- [ ] Event data returned includes the `id`, `groupId`, `venueId`, `name`,
  `description`, `type`, `capacity`, `price`, `startDate`, and `endDate`
- [ ] Event data returned includes aggregate data for `numAttending`
- [ ] Event data returned includes associated `Group` data, including `id`,
  `name`, `private`, `city`, and `state`
- [ ] Event data returned includes associated `Venue` data, if any, including
  `id`, `address`, `city`, `state`, `lat`, and `lng`
- [ ] Event data returns associated data for `EventImages`, an array of image
  data including the `id`, `url`, and `preview`
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`


### Create an Event for a Group specified by its id

Creates and returns a new event for a group specified by its id

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to create an event
- [ ] New event exists in the database after request
- [ ] `venueId` can be `null`
- [ ] Event data returned includes `id`, `groupId`, `venueId`, `name`, `type`,
  `capacity`, `price`, `description`, `startDate` and `endDate`
- [ ] Error response with status 400 is given when body validations for the
  `venueId`, `name`, `type`, `capacity`, `price`, `description`, `startDate`,
  or `endDate` are violated
- [ ] Error response with status 404 is given when a venue does not exist with
  the provided `id`


### Add an Image to an Event based on the Event's id

Create and return a new image for an event specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only an attendee of the event is authorized to add an image
- [ ] New image exists in the database after request
- [ ] Image data returned includes the `id`, `url`, and `preview`
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`


### Edit an Event specified by its id

Edit and returns an event specified by its id

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to create an event
- [ ] Event record is updated in the database after request
- [ ] Event data returned includes `id`, `groupId`, `venueId`, `name`, `type`,
  `capacity`, `price`, `description`, `startDate` and `endDate`
- [ ] Error response with status 400 is given when body validations for the
  `venueId`, `name`, `type`, `capacity`, `price`, `description`, `startDate`,
  or `endDate` are violated
- [ ] Error response with status 404 is given when a venue does not exist with
  the provided `id`
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`


### Delete an Event specified by its id

Delete an event specified by its id

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to create an event
- [ ] Event record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`


### Get all Members of a Group based on the Group's id

Returns all the members of a group specified by its id.

- [ ] Seed data exists in the database for members to be returned.
- [ ] Successful response includes only members for the specified group
- [ ] Member data returned includes the `id`, `firstName`, and `lastName` for
  each member
- [ ] Member data returned includes the associated membership `status`
- [ ] If you ARE the organizer of the group, members with a membership status of
  "pending" ARE included in the returned results
- [ ] If you are NOT the organizer of the group, members with a membership
  status of "pending" are NOT included in the returned results
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`


### Request a Membership for a Group based on the Group's id

Request a new membership for a group specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] New membership exists in the database after request
- [ ] Success response includes the `groupId`, `memberId`, and a `status` of
  "pending"
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`
- [ ] Error response with status 400 is given when the current user already has
  a pending membership for the group
- [ ] Error response with status 400 is given when the current user already has
  an accepted membership for the group


### Change the status of a membership for a group specified by id

Change the status of a membership for a group specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to change the status of a membership
- [ ] Membership record is updated in the database after request
- [ ] Success response includes the `id` `groupId`, `memberId`, and the new
  `status`
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`
- [ ] Error response with status 403 is given when changing the status to
  "co-host" when the current user is not the group organizer
- [ ] Error response with status 403 is given when changing the status to
  "member" when the current user is not the group organizer
  or a co-host
- [ ] Error response with status 400 is given when changing the status to
  "pending"
- [ ] Error response with status 404 is given when a membership between the user
  and group does not exist


### Delete membership to a group specified by id

Delete a membership to a group specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner/host of the group or the member themselves is authorized to
  delete the membership of a user to a group
- [ ] Membership record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`
- [ ] Error response with status 404 is given when a member does not exist with
  the provided `id`
- [ ] Error response with status 403 is given when a request is made to delete
  another user's membership when the current user is not the group organizer


### Get all Attendees of an Event specified by its id

Returns the attendees of an event specified by its id.

- [ ] Seed data exists in the database for attendees to be returned.
- [ ] Successful response includes only attendees for the specified event
- [ ] Attendee data returned includes the `id`, `firstName`, and `lastName` for
  each member
- [ ] Member data returned includes the associated membership `status`
- [ ] If you ARE the organizer of the group or a "co-host", attendees with an
  attendance status of "pending" ARE included in the returned results
- [ ] If you are NOT the organizer of the group or a "co-host", attendees with
  an attendance status of "pending" are NOT included in the returned results
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`


### Request to Attend an Event based on the Event's id

Request attendance for an event specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] New attendance exists in the database after request
- [ ] Success response includes the `eventId`, `userId`, and a `status` of
  "pending"
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`
- [ ] Error response with status 400 is given when the current user already has
  a pending attendance for the event
- [ ] Error response with status 400 is given when the current user already is
  already an accepted attendee for the event


### Change the status of an attendance for an event specified by id

Change the status of an attendance for an event specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner of the group or a member of the group with a membership
  status of "co-host" is authorized to change the status of a membership
- [ ] Attendance record is updated in the database after request
- [ ] Success response includes the `id` `eventId`, `userId`, and the new
  `status`
- [ ] Error response with status 404 is given when an event does not exist with
  the provided `id`
- [ ] Error response with status 400 is given when changing the status to
  "pending"
- [ ] Error response with status 403 is given when changing the status to
  "member" when the current user is not the organizer or a co-host
- [ ] Error response with status 404 is given when an attendance between the
  user and event does not exist


### Delete attendance to an event specified by id

Delete an attendance to an event specified by id.

- [ ] An authenticated user is required for a successful response
- [ ] Only the owner/host of the group or the member themselves is authorized to
  delete the attendance of a user to an event
- [ ] Attendance record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a group does not exist with
  the provided `id`
- [ ] Error response with status 404 is given when a member does not exist with
  the provided `id`
- [ ] Error response with status 403 is given when a request is made to delete
  another user's membership when the current user is not the group organizer


### Delete an Image for a Group

Delete an existing image for a Group.

- [ ] An authenticated user is required for a successful response
- [ ] Only the organizer or co-host of the group is authorized to delete
- [ ] Image record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when a group image does not exist
  with the provided `id`


### Delete an Image for an Event

Delete an existing image for an Event.

- [ ] An authenticated user is required for a successful response
- [ ] Only the organizer or co-host of the group is authorized to delete
- [ ] Image record is removed from the database after request
- [ ] Success response includes a `message` indicating a successful deletion
- [ ] Error response with status 404 is given when an image does not exist with
  the provided `id`


### Add Query Filters to Get All Events

Return events filtered by query parameters.

- [ ] Query parameters are accepted for `page`, `size`, `name`, `type` and
  `startDate`
- [ ] Default values are provided for the `page` and `size` parameters
- [ ] Successful response includes only events in the database that meet the
  specified query parameters criteria
- [ ] Event data returned includes the `id`, `groupId`, `venueId`, `name`,
  `type`, `startDate`, `endDate`, and `previewImage`
- [ ] Event data returned includes aggregate data for `numAttending`
- [ ] Event data returned includes associated `Group` data, including `id`,
  `name`, `city`, and `state`
- [ ] Event data returned includes associated `Venue` data, if any, including
  `id`, `city`, and `state`
- [ ] Successful response includes the `page` and `size` of the returned payload
- [ ] Error response with status 400 is given when query parameter validations
  for the `page`, `size`, `name`, `type` or `startDate` are violated
