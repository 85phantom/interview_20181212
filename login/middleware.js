const newError = require('../error')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Admin = require('../admin/model')
const config = require('../config')
const key = config.key

class loginAction{
    constructor(option){
        this.db = option.db;
        this.adminService= option.adminService;
    }

    async adminExistCheck(admin){
        const findLogin = await this.adminService.action.findAdmin({ email: admin.email });
        console.log("findLogin:",findLogin)
        if(findLogin.data.length == 1){
            return true;
        }
        return false;
        
    }

    adminLogin(){
        return async (req, res) =>{
            const admin = req.body;
            const newAdmin = new Admin(admin)
            
            if(await this.adminExistCheck(newAdmin)){
                const dbAdminQueryResult = await this.adminService.action.findAdmin({ email: newAdmin.email })
                const dbAdmin = dbAdminQueryResult.data[0]
                const compare = await bcrypt.compare(newAdmin.password , dbAdmin.password)
                if(compare){
                    const accesstoken = jwt.sign({ email: newAdmin.email }, key ,{expiresIn:'1d'});
                    return res.status(200).json({token : accesstoken});
                }
                else{
                    const newerr = new newError(403, 'Email or Password is wrong.')
                    return res.status(newerr.code).json(newerr);
                }
            }
            else{
                const newerr = new newError(403, 'Email or Password is wrong.')
                return res.status(newerr.code).json(newerr);
            }
        }
        
    }
}

module.exports = loginAction;
