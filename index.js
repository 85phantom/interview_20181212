const MemberService = require('./member');
const AdminService = require('./admin');
const LoginService = require('./login');

const Knex = require('knex');
const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
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
        this.memberService = new MemberService({app, db:this.db});
        this.adminService = new AdminService({app, db:this.db});
        this.LoginService = new LoginService({app, db:this.db, adminService: this.adminService});
        app.service = {}
        app.service.memberService = this.memberService;
        app.service.adminService = this.adminService;
        app.service.LoginService = this.LoginService;

    }
    async start(){
        app.listen(3000, () => {
            console.log('Server started.')
          });
    }
}

new App().start().then()