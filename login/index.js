const Middleware = require('./middleware')

class LoginService {
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.adminService = options.adminService;
        this.middleware = new Middleware({db: this.db, adminService: this.adminService})
        this.app.post('/login', this.middleware.adminLogin());
    }
}
module.exports = LoginService;