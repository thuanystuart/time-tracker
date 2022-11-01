# Dependencies

- Install [docker desktop](https://www.docker.com/products/docker-desktop/)

## To run the development server

- Install [python3](https://www.python.org/downloads/)
- Create virtual environment
  - `python3 -m virtualenv "env"`
- Activate virtual environment
  - `env/Scripts/activate.sh` (MacOS) `source env/bin/activate` (Windows)
- Install required libraries
  - `pip install -r backend/requirements.txt`
- Install [node.js](https://nodejs.org/en/)
- Install required modules
  - `npm install`

# Set up

Create a `.env` file to store the environment variables in the root folder and replace the empty variables with appropriate values.

```py
POSTGRES_PASSWORD=''
POSTGRES_DB='time-tracker-db'
POSTGRES_USER=''
POSTGRES_PORT='5432'
POSTGRES_HOST='localhost'

PGADMIN_USER=''
PGADMIN_PASSWORD=''
PGADMIN_PORT='5050'
PGADMIN_CONTAINER_PORT='80'

BACKEND_HOST='localhost'
BACKEND_PORT='5001'
FLASK_APP='src\\main.py'

SECRET_KEY=''

FRONTEND_PORT='3001'
```

# Run app on docker

Run the command to create the docker container on the root folder:
```sh
docker compose --profile prod up -d
```
The page should be accessible on the browser on `http://localhost:${FRONTEND_PORT}`.


# Run development server locally

Run the command to create the docker container on the root folder:
```sh
docker compose up -d
```
Activate the virtual environment to use the flask commands. Update the database schema by running:
```sh
flask db upgrade
```
Set up the flask location in an environment variable with `set FLASK_APP="src\\main.py"` (Windows OS), or `export FLASK_APP="src/main.py"` (MacOS).

On the backend folder, run the flask application:
```sh
flask run
```
On the frontend folder, run the angular application:
```sh
ng serve
```
The page should be accessible on the browser on `http://localhost:4200`.
