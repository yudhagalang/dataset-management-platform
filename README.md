# Dataset Management System (In Development)

## Introduction
This is Dataset Management Platform, a platform where you can upload your datasets and assign to tasks that you created. There are several rules though which written below:
* One dataset can only be assigned to one task. To change it, you can delete your task and assign the dataset to another task that you created.
* Max upload size for dataset is 5 MB.
* You can only download the dataset after you booked the task

## Installation steps
0. Make sure you have installed Node.js in your computer. You can install it using `nvm`
1. Download the code using 'Download ZIP' or you can clone it using `git clone https://github.com/yudhagalang/dataset-management-platform.git`. You can skip this step if you already have the zip file
2. Once downloaded, you can extract it and open Terminal from the extracted folder
3. Create a copy of `.env.example` file and rename it into `.env`
4. Add these lines to your `.env` file 
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=adonis
```
5. Run `npm install` in the terminal to install its dependencies
6. Run `mkdir tmp` in the terminal to create `tmp` folder as a path for your database file
7. Run `node ace migration:run` in the terminal to migrate the tables into database
8. Run `node ace db:seed -i` in the terminal and choose `database/seeder/User` if you want to have a dummy user to login. You can skip this step if you want to create user on your own.
9. Run the application by typing `node ace serve --watch` in the terminal
10. Open the server address in the browser. Default: `localhost:3333`
11. You can use the dummy user below to login the application.
```
DUMMY USER
email: dummy@mail.com
password: password
```
12. Try out the features!
