const Action = require('./action');
const Middleware = require('./middleware');
const { verifyAdmin } = require('../login/verify')

class MemberService{
    constructor(options){
        this.db = options.db;
        this.app = options.app;
        this.action = new Action({db: this.db});
        const middleware = new Middleware({ adminActions: this.action})
        
        this.app.post('/admin', verifyAdmin(), middleware.createAdmin());
        this.app.get('/admin', verifyAdmin(), middleware.findAdmin());
        this.app.put('/admin/:id', verifyAdmin(), middleware.updateAdmin());
        this.app.delete('/admin/:id', verifyAdmin(), middleware.deleteAdmin());
    }
}

module.exports = MemberService;