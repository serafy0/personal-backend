import type { Knex } from "knex"

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            connectionString: "postgresql://localhost/personal_backend",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
}

export = config
