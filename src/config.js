module.exports = {
    ADDRESS: process.env.ADDRESS || 'https://guardian-ride-api.herokuapp.com/',
    PORT: process.env.PORT || 8137,
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_TOKEN: process.env.API_TOKEN || '7b967bbe-afc2-11ea-b3de-0242ac130004',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://mzncziuayodpkz:5f259572bb0e0fba83a2129763e9a9f1bc5e1b6d4f1bf4507d71184919f49f2f@ec2-100-25-231-126.compute-1.amazonaws.com:5432/d4i3f6ebq1pdjn?ssl=true',
}