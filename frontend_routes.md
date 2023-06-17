
                  

## 1. New account creation, log in, log out, and guest/demo login
* Users can sign up, log in, and log out.
* '/signup'                   Displays the signup form.
* '/login'                    Displays the login form.
* '/logout'                   Performs the logout action.

* Users can use a demo log in to try the site.
* '/demo-login'               Logs in the user with a demo account.

* Users can't use any features without logging in.
* Logged in users are directed to their Dashboard which displays all of their unsettled bills.
* Logged out users are directed to the About Page for SplitSmart.
* '/'                 Displays the home page of SplitSmart.






## 2. Friends (Partial CRUD)
* Logged in users can add friends.
* '/friends/add'                  

* Logged in users can remove friends.
* '/friends/:id/remove'           

* Logged in users can view all their friends in the Navigation.
* '/friends'                       







## 3. Expenses (Full CRUD)
* Logged in users can add an expense.
* '/expenses/new'              Displays a form to create a new expense.

* Logged in users can edit and delete their own expenses (expenses that they added).
* '/expenses/:id/edit'         Displays a form to edit a specific expense.

* Logged in users can view their settled and unsettled expenses in the All Expenses Page.
* '/expenses'                  Displays all expenses for the user.


* Logged in users can view their unsettled expenses in each Friend page.
??????





## 4. Bills (Partial CRUD)
* Bills get created when a user charges or gets charged an expense.
* Bills get updated when a user charges or gets charged an expense.
* Logged in users can view their bills on their Dashboard.


* '/bills'                             Displays the user's bills .



## 5. Comments (Full CRUD)

* Logged in users can add comments to an expense that they're a part of.
* '/expenses/:id/comments/new'  

* Logged in users can edit and delete their own comments.
* '/expenses/:id/comments/:commentId/edit'               
* '/expenses/:id/comments/:commentId/delete' 

* Logged in users can view all comments of an expense that they're a part of.
* '/expenses/:id/comments' 


                         
             