const Action = require('./action');
const Middleware = require('./middleware');

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ adminActions: this.action})
        this.app.post('/admin', middleware.createAdmin());
        this.app.get('/admin', middleware.findAdmin());
        this.app.put('/admin/:id', middleware.updateAdmin());
        this.app.delete('/admin/:id', middleware.deleteAdmin());
    }
}

module.exports = MemberService;