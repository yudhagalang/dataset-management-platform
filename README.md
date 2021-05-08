# Dataset Management System (In Development)

## Introduction
This is Dataset Management Platform, a platform where you can upload your datasets and assign to tasks that you created. There are several rules though which written below:
* One dataset can only be assigned to one task. To change it, you can delete your task and assign the dataset to another task that you created.
* Max upload size for dataset is 5 MB.
* You can only download the dataset after you booked the task

## Installation steps
1. Download the code using 'Download ZIP' or you can clone it using `git clone https://github.com/yudhagalang/dataset-management-platform.git`. You can skip this step if you already have the zip file
2. Once downloaded, you can extract it and open Terminal from the extracted folder
3. Create a copy of `.env.example` file and rename it into `.env`
4. Run `npm install` to install its dependencies
5. Run `node ace migration:run` to migrate the tables into database
6. Run `node ace db:seed -i` and choose `database/seeder/User` if you want to have a dummy user to login. You can skip this step if you want to create user on your own.
```
DUMMY USER
email: dummy@mail.com
password: password
```
7. You can use the dummy user above to login the application.
8. Try out the features!
