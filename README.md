# EasyNote
This repository hosts the source code for EasyNote, an user-friendly note-taking application designed to help you manage your notes efficiently. 

EasyNote offers a clean and intuitive UI, making it simple for users to create, edit, and organize their notes.

![Main page](./application/public/assets/main.png)

> **Note:** *This project is being hosted at: ---*

<br>

# Content

- [How to use it](#how-to-use-it)
    - [Login page](#login-page)
    - [Register page](#register-page)
    - [Home page](#home-page)
        - [Create note](#create-note)
        - [Edit note](#edit-note)
        - [Delete note](#delete-note)
        - [Order by tags](#order-by-tags)
        - [Order by color](#order-by-color)
        - [Reset order](#reset-order)
        - [View notes and page](#view-notes-and-page)
    - [Dark / light theme](#dark--light-theme)
- [To Do](#to-do)

<br>

# How to use it

The application offers the user a login page in which it can authenticate if it already has an account, otherwise there is a register page in which it can create an account.

### **Login page**

![Login page](./application/public/assets/login.jpeg)


### **Register page**

![Register page](./application/public/assets/register.jpeg)


### **Home page**

After a successful authentication, the user will be redirected to the home page in which it can view, create, edit or delete notes.

![Home page](./application/public/assets/home.jpeg)


#### **Create note**

The user can click the option `Create note` from the menu on the sidebar to create a new note. When doing so, a title and content for the note are required. Also, if the user selects a color it will automatically change the popup background color to preview it.

![Create note](./application/public/assets/gif/create-note.gif)


#### **Edit note**

The user can click the option 
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill='currentColor' class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> 
from the note itself to edit the note. When doing so, as same as before a title and content for the note are required and if the user selects a color it will automatically change the popup background color to preview it.

![Edit note](./application/public/assets/gif/edit-note.gif)


#### **Delete note**

The user can click the option 
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill='currentColor' class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
from the note itself to delete the note. When doing so, a confirmation popup will open asking the user to confirm the note deletion. If the user confirms then the note will be deleted and it will no longer appears.

![Delete note](./application/public/assets/gif/delete-note.gif)


#### **Order by tags**

The user can click the option `Order by tags` from the menu on the sidebar to order the notes by tags alphabetically.

![Order by tags](./application/public/assets/gif/order-tags.gif)


#### **Order by color**

The user can click the option `Order by color` from the menu on the sidebar to order the notes by color. This option will order the notes depending on the color hex-value.

![Order by color](./application/public/assets/gif/order-color.gif)


#### **Reset order**

The user can click the option `Reset order` from the menu on the sidebar to reset the notes order to default.

![Reset order](./application/public/assets/gif/reset-order.gif)


#### **View notes and page**

The user can click the option `View All` from the dropdown menu on the sidebar to change how many notes per page it wants to see and if there is more than one page then the user can click 
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
    <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
</svg> 
or
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
    <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
</svg>
to move between pages.

![View page](./application/public/assets/gif/view-page.gif)

<br>

### **Dark / light theme**

Within the application the user can click at any moment the `Theme` button from the navigation bar to change between dark and light mode.

![Theme](./application/public/assets/gif/theme.gif)

<br>

# To Do

- Add app tutorial in `Learn more` button in main page
- Create functionality to add reminders
- Create functionality to add tasks
- Redesign grid in home page
