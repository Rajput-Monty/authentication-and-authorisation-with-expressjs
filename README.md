# authentication-and-authorisation-with-expressjs with User Deletion Functionality

## Challenge Overview

The challenge involved with a new feature: user deletion. The goal was to implement a deletion mechanism that allows authenticated users and admins to delete other users and themselves from the system.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**
- **npm**: Node Package Manager (comes with Node.js)
- **Database**: SQLite 3 
- **Environment Variables**: Create an `.env` file in back-end folder

## Setup and Installation

1. **Clone the Repository**

    First, clone the repository to your local machine using Git:

    ```bash
    git clone https://github.com/Rajput-Monty/authentication-and-authorisation-with-expressjs.git
    ```

2. **Navigate to the Project Directory**

    Change directory to the project folder:

    ```bash
    cd authentication-and-authorisation-with-expressjs 
    cd back-end 
    ```

3. **Install Dependencies**

    Install the required Node.js packages using npm:

    ```bash
    npm install bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken morgan sequelize sqlite3
    ```

4. **Setup Environment Variables**

    Create a `.env` file in the back-end directory and add the necessary environment variables. Example:

    ```
    TOKEN_KEY = "StackUpAuthenticationProject123!";
    PORT = 4001;
    ```

5. **Start the Application**

    Start the server using node (ensure your current working directory is back-end)

    ```bash
    node app.js
    ```

    By default, the server will be accessible at `http://localhost:4001`.

   if you are using cloud development you need to change the default localhost link `http://localhost:4001` with your generated link( got after running node app.js)

   Run both front-end (live server) and back-end (node app.js) and make sure both server are public 

## Key Features Implemented

### Delete User Functionality

- **Backend Implementation**: 

    A new function, `delete_user_by_username`, was added to the `authController.js` file to handle user deletion requests. This function uses Sequelize's `destroy` method to remove a user from the database based on their username.

    ```javascript
    const delete_user_by_username = async (req, res) => {
        const { username } = req.body;

        try {
            const user = await UserModel.findOne({ where: { username } });

            if (!user) {
                return res.status(400).json({ message: "User not found", ok: false });
            }

            await UserModel.destroy({ where: { username: username } });

            return res.status(200).json({ message: `User ${username} has been deleted successfully.`, ok: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An error occurred while trying to delete the user." });
        }
    };
    ```

- **Routes Setup**:

    The `authHandling.js` file was updated to include a new route for user deletion. This route uses middleware to ensure that only authenticated users or admin can access it.

    ```javascript
    router.post(
        "/delete/user",
        authentication,
        authorisation({ isAdmin: false}),
        (req, res) => authController.delete_user_by_username(req, res)
    );
    ```


### Implementation Notes

- **User Interface**:

    Created a new HTML file `web-front-end/pages/admin/delete-user.html` for the user deletion form. This form allows us to input a username to delete. The design is kept minimal to focus on functionality.


- **JavaScript Integration**:

    The JavaScript code listens for the form submission, sends a POST request to the backend with the username to be deleted, and handles the response by notifying the user and redirecting them to the dashboard.


- **Css Style Integration**:

   In addition to implementing the user deletion functionality, we have also added CSS styling to enhance the visual presentation of the web pages. The styles 
   ensure that forms and buttons are centered and visually appealing, improving user experience. The CSS is included in the `styles/styles.css` file and is 
   applied across the relevant HTML pages, including the new delete user page.


- **Frontend Simplicity**:

    The frontend for the deletion feature is designed to be straightforward, providing a clear input field for the username and a button to submit the deletion request. This approach aligns with the challenge requirements to keep the interface minimal and functional.

This implementation fulfills the challenge by integrating a secure user deletion feature with appropriate authorization checks and a simple web interface for user interaction.
