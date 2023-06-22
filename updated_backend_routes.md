
# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

# Users
*  A new user can sign up for an account. After successful registration, a session is established.
    * `POST /api/users/signup`
* An existing user can log in to their account, establishing a session.
    * `POST /api/users/login`
* A logged-in user can log out, ending the session.
    * `POST /api/users/logout`

# Friends
* A user can create a new friendship.
  * `POST /api/friendships/:user_id`
* A user can view friendship
  * `GET /api/friendships/:id`
* A user can get a list of all their friendships.
  * `GET /api/friendships`
* A user can update a friendship status or bill.
  * `PUT /api/friendships/:id`


# Expenses
* A user can create a new expense.
  * `POST /api/expenses`
* A user can get a list of all their expenses.
  * `GET /api/expenses`
* A user can get a expense details
  * `GET /api/expenses/:id`
* A user can update an expense.
  * `PUT /api/expenses/:id`
* A user can delete an expense.
  * `DELETE /api/expenses/:id`

# Payments
* A user can create a new payment.
  * `POST /api/payments`
* A user can get a list of all their payments.
  * `GET /api/payments`
* A user can delete a payment.
  * `DELETE /api/payments/:id`

# Comments
* A user can add a comment to an expense.
  * `POST /api/comments`
* A user can get a list of all comments for an expense.
  * `GET /api/comments/:expense_id`
* A user can update their comment.
  * `PUT /api/comments/:id`
* A user can delete their comment.
  * `DELETE /api/comments/:id`
