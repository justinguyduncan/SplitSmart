# **Database Schema**

## `users`

| column name  | data type | details                   |
|--------------|-----------|---------------------------|
| id           | integer   | not null, primary key     |
| first_name   | string    | not null,                 |
| last_name    | string    |                           |
| email        | string    | not null, indexed, unique |
| phone_number | string    | unique                    |
| created_at   | datetime  | not null                  |
| updated_at   | datetime  | not null                  |

## `friendships`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| friend_id   | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `user_id` references `users` table
* `friend_id` references `users` table

## `expenses`

| column name  | data type | details               |
|--------------|-----------|-----------------------|
| id           | integer   | not null, primary key |
| description  | string    | not null              |
| total_amount | decimal   | not null              |
| creator_id   | integer   | not null, foreign key |
| is_settled   | boolean   | not null              |
| created_at   | datetime  | not null              |
| updated_at   | datetime  | not null              |

* `creator_id` references `users` table

## `split_expenses`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| expense_id  | integer   | not null, foreign key |
| user_id     | integer   | not null, foreign key |
| amount_due  | decimal   | not null              |
| is_settled  | boolean   | not null              |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `expense_id` references `expenses` table
* `user_id` references `users` table

## `comments`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| comment     | string    | not null              |
| expense_id  | integer   | not null              |
| user_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `expense_id` references `expenses` table
* `user_id` references `users` table
