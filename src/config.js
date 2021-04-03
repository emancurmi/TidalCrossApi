module.exports = {
    ADDRESS: process.env.ADDRESS || 'https://tidalcrossapi.herokuapp.com/',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_TOKEN: process.env.API_TOKEN || '$2a$10$ra1z0n2XnSnbMP/ipTMHeOqqrI7i8Rssm/z8MHTxgb7LamV7LpfXu',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://umzdphqiohirul:a27069a4026105e5c83bcbc04c576441fb0aec73c241c91a45326b310963790c@ec2-52-213-173-172.eu-west-1.compute.amazonaws.com:5432/d5it7csmicrnve?ssl=true',
}