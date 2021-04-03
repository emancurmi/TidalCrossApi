module.exports = {
    ADDRESS: process.env.ADDRESS || 'https://tidalcrossapi.herokuapp.com/',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_TOKEN: process.env.API_TOKEN || '$2a$10$ra1z0n2XnSnbMP/ipTMHeOqqrI7i8Rssm/z8MHTxgb7LamV7LpfXu',
    DATABASE_URL: process.env.DB_URL,
}