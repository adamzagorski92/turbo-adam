# Postgres init (infrastructure)

Put optional initialization scripts here.

They are mounted into the container as `/docker-entrypoint-initdb.d`.

Examples:

- `001-create-extensions.sql`
- `010-seed.sql`

Notes:

- Scripts run only on first initialization of the database volume.
