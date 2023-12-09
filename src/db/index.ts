import {Pool} from "pg"

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
})

export const getClient = async () => {
    return pool;
}