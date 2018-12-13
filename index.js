const MemberService = require('./member');

const Knex = require('knex');
const Express = require('express');
const app = Express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const dbConfig = {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      port: 3306,
      database : 'interview_1212'
    }
  }

class App{
    constructor(){
        this.db = Knex(dbConfig); 
        this.memberService = new MemberService({app, db:this.db})

    }
    async start(){
        app.listen(3000, () => {
            console.log('Server started.')
          });
    }
}

new App().start().then()