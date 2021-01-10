# Good Fodd OSS API

## Local run

- run local docker DB
  ```bash
  cd db/
  docker-compose -f stack.yaml --env-file=database.env up
  ```
- run local postgraphile server

  ```yarn
  yarn pg
  ```

## Migration

| up                  | down                  |
| ------------------- | --------------------- |
| `npx db-migrate up` | `npx db-migrate down` |

---

- when `.db-migraterc` not present

  - to run with custom environment variable
    ```
    npx db-migrate up --dotenvCustomPath "./db/database.env"
    ```
  - create migrations

    ```
    npx db-migrate create create-test-db --sql-file
    ```

    otherwise
    ```
    npx db-migrate up
    ```
    &
    ```
    npx db-migrate create create-test-db
    ```
