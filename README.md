# SplitSmart

SplitSmart is a Splitwise clone where users can add friends, charge expenses to multiple friends, and settle up IOU’s in a minimal number of payments.

**Live Site:** [SplitSmart](https://splitsmart.onrender.com)

**Created By:** [Aurora Ignacio](https://github.com/bellaignacio) | Justin Duncan | Dmytro Yakovenko

**Technologies Used:** [Python](https://docs.python.org/3/) | [JavaScript](https://devdocs.io/javascript/) | [PostgreSQL](https://www.postgresql.org/docs/) | [Flask](https://flask.palletsprojects.com/en/2.3.x/) | [SQLAlchemy](https://docs.sqlalchemy.org/en/20/) | [React](https://react.dev/) | [Redux](https://redux.js.org/) | [Amazon Web Services S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

## Design Documentation

* [Current & Future Features](https://github.com/bellaignacio/splitwise-clone-flask/wiki/Feature-List)
* [User Stories & Frontend Routes](https://github.com/bellaignacio/splitwise-clone-flask/wiki/User-Stories)
* [Backend API Documentation](https://github.com/bellaignacio/splitwise-clone-flask/wiki/Backend-Routes)
* [Database Schema](https://github.com/bellaignacio/splitwise-clone-flask/wiki/Database-Schema)

## How to build & run the project locally:

 1. Clone this GitHub repository [bellaignacio/splitwise-clone-flask](https://github.com/bellaignacio/splitwise-clone-flask) onto your local machine.
 2. Set up your own AWS S3 Bucket.
 3. Create a `.env` file inside the root directory with the proper settings for your development environment. See the `example.env` file.
 4. Inside the root directory, run the following command to install Python dependencies
	```
	pipenv install -r requirements.txt
	```
 5. Inside the react-app directory, run the following command to install JavaScript dependencies
	```
	 npm install
	```
 6. Inside the root directory, run the following command to create and seed the database, and start up the backend server
	```
	pipenv shell && flask db init && flask db migrate && flask db upgrade && flask seed all && flask run -p 3000
	```
7. Inside the react-app directory, run the following command to start up the frontend server
	```
	npm start
	```

## Site In Action

### Sign Up Page
![Sign Up Page](/react-app/public/signup.gif)

### Login Page
![Login Page](/react-app/public/login.png)

### Home Page
![Home Page](/react-app/public/home.gif)

### Search Feature
![Search Feature](/react-app/public/search.gif)

### Profile Page
![Profile Page](/react-app/public/profile.png)

### List Page
![List Page](/react-app/public/list.gif)

### Create List Page
![Create List Page](/react-app/public/create_list.gif)

### Edit List Page
![Edit List Page](/react-app/public/edit_list.gif)

## Implementation Details

ADD SOMETHING HERE :D
