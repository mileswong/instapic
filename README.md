# InstaPic

<!-- GETTING STARTED -->
## Getting Started

Below is the guide to run Flask server and React frontend for this project locally.

To start Flask backend, replace the following credentials in order to use S3 to store the images in `docker-compose.yml` file.
```json
S3_BUCKET: "put-your-s3-bucket-key-here"
S3_ACCESS_KEY_ID: "put-your-aws-access-key-id-here"
S3_SECRET_ACCESS_KEY: "put-your-aws-secret-access-key-id-here"
AWS_REGION_NAME: "put-your-service-region-name-here"
```
You also must have Docker installed in your machine. The following command will start up both the Flask backend and the PostgreSQL database.
```sh
docker-compose up
```

To start React frontend, you must have Node and npm installed in your machine.
```sh
cd frontend   # enter `frontend` directory
npm install   # install dependencies
npm start     # start the react-scripts
```


## Folder Structure
```
.
├── frontend                    # React app
│   ├── public
│   ├── src                     # Soruce files
│   └── tests                   # Test files
└── server                      # Flask app
    ├── instapic                # App package
    |   ├── api                 # API files and schemas
    |   ├── migrations          # Database migration alembic scripts
    |   ├── models              # Model files
    |   └── api                 # Test for APIs
    └── swagger                 # API documentations  
```
