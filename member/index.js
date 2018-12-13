const Action = require('./action');
const Middleware = require('./middleware');

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ memberActions: this.action})
        this.app.post('/members', middleware.createMember());
    }
}

module.exports = MemberService;