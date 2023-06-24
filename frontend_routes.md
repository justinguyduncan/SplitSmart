                  

## 1. New account creation, log in, log out, and guest/demo login
* Users can sign up, log in, and log out.
    * '/signup'                   Displays the signup form.
    * '/login'                    Displays the login form.
    * '/logout'                   Performs the logout action.

* Users can use a demo log in to try the site.
    * '/demo-login'               Logs in the user with a demo account.

* Users can't use any features without logging in.
* Logged in users are directed to their Dashboard which displays all of their unsettled bills.
    * '/dashboard'
* Logged out users are directed to the Home Page for SplitSmart.
    * '/'                 Displays the home page of SplitSmart.






## 2. Friends (Partial CRUD)
* Logged in users can add friends from all pages in navigation menu
    * '/dashboard/'                  

* Logged in users can remove friends.
    * '/friends/:id/remove'           

* Logged in users can view all their friends in the Navigation from all pages
    * '/dashboard/'                     







## 3. Expenses (Full CRUD)
* Logged in users can add an expense.
    * '/expenses'       Displays a form to create a new expense from all pages

* Logged in users can edit and delete their own expenses (expenses that they added).
    * '/expenses'         Displays a form to edit a specific expense.

* Logged in users can view their settled and unsettled expenses in the All Expenses Page.
    * '/expenses'                  Displays all expenses for the user.
* Logged in users can view details their settled and unsettled expenses in the All Expenses Page.

     * '/expenses'   Display accordion(more info about expense under expense)

* Logged in users can view their unsettled expenses in each Friend page.
'/expenses' 





## 4. Bills (Partial CRUD)
* Bills get created when a user charges or gets charged an expense.
 * '/expenses'   
* Bills get updated when a user charges or gets charged an expense.
 * '/expenses'   
* Logged in users can view their bills on their Dashboard.


    * '/dashboard'                             Displays the user's bills .



## 5. Comments (Full CRUD)

* Logged in users can add comments to an expense that they're a part of.
    * '/expense' - Create new comment in accordion(more info for expense in TextArea)

* Logged in users can edit and delete their own comments.
    *      '/expense' - Edit comment in accordion(more info for expense in TextArea)              
        * '/expense' - Delete comment in accordion(more info for expense in TextArea)
* Logged in users can view all comments of an expense that they're a part of.
    * '/expense' - Can view all comments in accordion(more info for expense )


                         
             