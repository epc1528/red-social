export const pg = {
    host: process.env.PG_HOST ?? 'localhost',
    port: process.env.PG_PORT ?? '5432',
    username: process.env.PG_USER ?? 'postgres',
    password: process.env.PG_PASS ?? 'postgres',
    database: process.env.PG_DATABASE ?? ''
}

export const port = +(process.env.PORT ?? '9000');

export const redis = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ?? '6379',
    username: process.env.REDIS_USER ?? 'redis',
    password: process.env.REDIS_PASS ?? 'redis',
}

export const jwtsecret = {
    secret: process.env.SECRETJWT ?? ''
}

export const swaggerCredential = {
    user: process.env.SWAGGERUSER ?? 'admin',
    secret : process.env.SWAGGERSECRET ?? 'admin',
}

export const emailCredential = {
    email: process.env.EMAILUSER ?? '',
    pass: process.env.EMAILPASS ?? '',
}