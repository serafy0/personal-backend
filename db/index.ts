import knex from "knex"
import config from "./knexfile"

const environment = process.env.ENVIRONMENT || "development"

const db = knex(config[environment])

export default db
