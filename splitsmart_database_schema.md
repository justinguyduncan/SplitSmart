# **Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| first_name  | string    | not null,                 |
| last_name   | string    |                           |
| email       | string    | not null, indexed, unique |
| phone_number| integer   | unique                    |
| created_at  | datetime  | not null                  |
| updated-at  | datetime  | not null                  |

## `friendship table`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user1_id    | string    | not null              |
| user2_id    | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

* `user1_Id` references `users` table
* `user2_Id` references `users` table

## `expenses`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| description   | string    | not null, (50)        |
| amount        | decimal   | not null,             |
| creatorId     | integer   | not null, foreign key |
| is_settled    | boolean   | not null,             |
| created_at    | datetime  | not null              |
| updated-at    | datetime  | not null              |

* `payerId` references `users` table
* `creatorId` references `users` table

## `expenses_participants`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| expenseId     | integer   | not null,                      |
| userId        | integer   | not null,  foreign key         |
| is_paid       | boolean   | not null,                      |
| amount_due    | decimal   | not null,                      |
| created_at    | datetime  | not null                       |
| updated-at    | datetime  | not null                       |

* `userId` references `users` table
* `expenseId` references `expense` table


## `comments`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| comment       | string    | not null, (50)        |
| expenseId     | integer   | not null,             |
| creatorId     | integer   | not null, foreign key |
| created_at    | datetime  | not null              |
| updated-at    | datetime  | not null              |

* `creatorId` references `users` table
* `expenseId` references `expense` table
