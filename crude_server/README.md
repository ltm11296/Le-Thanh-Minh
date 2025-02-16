## Set up

This simple crude server requires [Node.js](https://nodejs.org/) v22.14.0, docker to run.

Install the database server

```sh
docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
After run database server, log in with user root, password root and create schema code_challenge, run below sql to create example table

```sh
create table EXAMPLE
(
    ID          int auto_increment
        primary key,
    VALUE       int          not null,
    DESCRIPTION varchar(500) null
);
```
Select crude_server directory in cmd and run following commands to start server
```sh
npm i
npm i -D tsx
node --import=tsx crude.ts
```

## Test

This simple crude server provide CRUD api. Examples:

Create resource:
```sh
POST http://localhost:8080/create
Content-Type: application/json
{
  "value": 3,
  "description": "description"
}

Response:
{
  "code": "SUCCESS"
}
```

Update resource:
```sh
POST http://localhost:8080/update
Content-Type: application/json
{
  "id": 1,
  "value": 5,
  "description": "description"
}

Response:
{
  "code": "SUCCESS"
}
```

Delete resource:
```sh
POST http://localhost:8080/delete
Content-Type: application/json
{
  "id": 1
}

Response:
{
  "code": "SUCCESS"
}
```

Get resource detail:
```sh
POST http://localhost:8080/get
Content-Type: application/json
{
  "id": 1
}

Response:
{
  "value": 5,
  "description": "description"
}
```

List resources with basic value filter and paging:
```sh
POST http://localhost:8080/list
Content-Type: application/json

{
  "offset": 0,
  "limit": 5,
  "fromValue": 0,
  "toValue": 100
}

Response:
[
  {
    "id": 1,
    "value": 5,
    "description": "description"
  },
  {
    "id": 2,
    "value": 3,
    "description": "description"
  },
  {
    "id": 4,
    "value": 3,
    "description": "description"
  }
]
```
