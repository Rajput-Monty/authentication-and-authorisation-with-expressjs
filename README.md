# authentication-and-authorisation-with-expressjs with User Deletion Functionality

## Challenge Overview

The challenge involved enhancing a user management system with a new feature: user deletion. The goal was to implement a secure deletion mechanism that allows authenticated users to delete other users from the system. This feature needed to be accessible via a web interface and should only be performed by users with proper authorization.

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

    The `authHandling.js` file was updated to include a new route for user deletion. This route uses middleware to ensure that only authenticated and authorized users (admins) can access it.

    ```javascript
    router.post(
        "/delete/user",
        authentication,
        authorisation({ isAdmin: true }),
        (req, res) => authController.delete_user_by_username(req, res)
    );
    ```

    Here, `authentication` middleware ensures that the user is logged in, and `authorisation({ isAdmin: true })` ensures that only users with admin privileges can perform deletions.

### Frontend Interaction

- **User Interface**:

    Created a new HTML file (`delete-user.html`) for the user deletion form. This form allows admins to input a username to delete. The design is kept minimal to focus on functionality.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delete User</title>
        <link rel="stylesheet" href="../styles/styles.css">
    </head>
    <body>
        <h1>Delete User</h1>
        <form id="delete-user-form">
            <label for="other-username">Username:</label>
            <input type="text" id="other-username" name="username" required>
            <br>
            <button type="submit">Delete User</button>
        </form>

        <script>
            document.getElementById("delete-user-form").addEventListener("submit", async (event) => {
                event.preventDefault();
                const username = document.getElementById("other-username").value;
                const response = await fetch(`http://localhost:4001/auth/delete/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username }),
                    credentials: "include"
                });

                const result = await response.json();
                if (result.ok) {
                    alert('User deleted successfully');
                    window.location.href = './dashboard.html';
                } else {
                    alert('User deletion failed! Please check the username.');
                }
            });
        </script>
    </body>
    </html>
    ```

- **JavaScript Integration**:

    The JavaScript code listens for the form submission, sends a POST request to the backend with the username to be deleted, and handles the response by notifying the user and redirecting them to the dashboard.

## Implementation Notes

- **Authentication and Authorization**:

    The delete functionality is protected by authentication to ensure that only logged-in users can access it. Additionally, authorization is implemented to ensure that only users with admin rights can delete other users. This prevents unauthorized users from performing destructive actions.

- **Frontend Simplicity**:

    The frontend for the deletion feature is designed to be straightforward, providing a clear input field for the username and a button to submit the deletion request. This approach aligns with the challenge requirements to keep the interface minimal and functional.

This implementation fulfills the challenge by integrating a secure user deletion feature with appropriate authorization checks and a simple web interface for user interaction.
