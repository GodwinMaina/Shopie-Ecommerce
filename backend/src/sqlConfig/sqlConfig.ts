
export const sqlConfig = {
    user:'sa',
    password:'Nairobi@2023',
    database: 'Tuuze',
    server: 'DESKTOP-E5BURTF',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate:false
    }
};

console.log(sqlConfig);