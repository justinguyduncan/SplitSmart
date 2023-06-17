# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a signup form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my name, email address, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the signup form.
  * When I enter invalid data on the signup form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a login form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the login form.
  * When I enter invalid data on the login form:
    * I would like the website to inform me of the validations I failed to pass, and clear the form.

### Demo User

* As an unregistered and unauthorized user, I would like an easy-to-find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button inside the profile button's dropdown menu.
  * When I'm on any page:
    * I can log out of my account and be redirected to the About Page for SplitSmart.
    * So that I can easily log out to keep my information secure.

## Friends

### Creating Friends

* As a logged in user, I want to be able to add new friends via an easy to find button inside the navigation bar.
  * When I'm on any page (excluding the `/signup` or `/login` pages):
    * I can click "Add a friend" to view an Add Friend modal with a clearly laid out form
    * I can enter an email address of an existing account and an optional message.
  * When I enter invalid data on the form:
    * I would like the website to inform me of the validations I failed to pass, and clear the form.

### Viewing Friends

* As a logged in user, I want to be able to view a list of my friends via the navigation bar.
  * When I'm on any page (excluding the `/signup` or `/login` pages):
    * I can view a list of all my friends and click on any friend to redirect to their Friend Page.

* As a logged in user, I want to be able to view an individual Friend Page.
  * When I'm on the `/friends/:id` page:
    * I can view a list of all unsettled expenses for that friend.

### Deleting Friends

* As a logged in user, I want to be able to remove my friend by clicking a button that appears on their Friend Page.
  * When I'm on the `/friends/:id` page:
    * I can click "Remove this friend" to permanently delete a friend.

## Expenses

### Creating Expenses

* As a logged in user, I want to be able to add new expenses.
  * When I'm on the `/dashboard`, `/expenses/all`, or `/friends/:id` pages:
    * I can click "Add an expense" to view an Add Expense modal with a clearly laid out form
    * I can enter the name of an existing friend, a description, and amount
  * When I enter invalid data on the form:
    * I would like the website to inform me of the validations I failed to pass, and clear the form.

### Viewing Expenses

* As a logged in user, I want to be able to view all of my expenses (settled and unsettled) and payments
  * When I'm on the `/expenses/all` page:
    * I can view the ten most recently posted expenses and payments.

* As a logged in user, I want to be able to view specific expenses for a friend on their Friend Page.
  * When I'm on the `/friends/:id` page:
    * I can click on a unsettled expense to view additional information and comments

### Updating Expenses

* As a logged in user, I want to be able to update the description, particpants and/or amount of an expense
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click on a unsettled expense to click on "Edit expense", and view an Edit Expense modal with a clearly laid out form
    * I can change the list of participants, description, and amount
  * When I enter invalid data on the form:
    * I would like the website to inform me of the validations I failed to pass, and reset the form to the original data.

### Deleting Expenses

* As a logged in user, I want to be able to remove my friend by clicking a button that appears on their Friend Page.
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click the red X button to permanently delete an expense.

## Bills
### Viewing Bills

* As a logged in user, I want to be able to see all of my bills.
  * When I'm on the `/dashboard` page:
    * I can view all my positive bills under "You Owe"
    * I can view all my negative bills under "You Are Owed"

## Comments

### Creating Comments

* As a logged in user, I want to be able to add comments to an expense.
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click on an expense to enter my comment and click "Post".
  * When I enter invalid data on the form:
    * I would like the website to inform me of the validations I failed to pass, and clear the form.

### Viewing Comments

* As a logged in user, I want to be able to view comments of an expense.
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click on an expense to view all of its comments.

### Updating Comments

* As a logged in user, I want to be able to view comments of an expense.
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click on an expense to view all of its comments and click the gray pencil button open an Edit Comment modal.
    * I can change the comment.
  * When I enter invalid data on the form:
    * I would like the website to inform me of the validations I failed to pass, and reset the form to the original data.


### Deleting Comments

* As a logged in user, I want to be able to delete my comments of an expense.
  * When I'm on the `/expenses/all`, or `/friends/:id` pages:
    * I can click on an expense to view all of its comments and click the red X button to permanantly delete a comment.
