# Taskify

Description: TaskMaster is a simple yet powerful Todo API designed to manage tasks with basic authentication. The project allows users to perform CRUD (Create, Read, Update, Delete) operations on a todo list stored in a JSON file. Users can create tasks, view existing tasks, update task details, and delete tasks through HTTP requests.

Authentication: The authentication system in TaskMaster is straightforward and doesn't rely on sessions or tokens like JWT. Users simply log in with their email and password, and if the credentials match the stored data, they are granted access. The password verification is done directly, making it easy to implement without the complexity of session management.

Features:

Create Todo: Users can create new tasks with a description.
Read Todos: Retrieve all tasks or individual tasks by their ID.
Update Todo: Modify existing tasks, including changing their status or description.
Delete Todo: Remove tasks from the list.
Simple Authentication: Users authenticate using their email and password directly, without using complex session or JWT-based authentication.
Technologies Used:

Node.js
Express.js
File-based storage (JSON)
Basic email and password authentication
