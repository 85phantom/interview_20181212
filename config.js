const db = {
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'root',
        port: 3306,
        database : 'interview_1212'
    }
}

module.exports = { db };