import {Pool} from "pg"

export const pool = new Pool({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
})

export const getClient = async () => {
    return pool;
}
