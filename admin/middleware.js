const newError = require('../error');
const { check, validationResult } = require('express-validator/check');

class AdminMiddleware{
    constructor(options){
        this.adminActions = options.adminActions;
    }
    validateAdmin(req){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return errors.array()
        }
    }
    createAdmin(){
        return async(req, res) => {
            console.log(req.body);
            try {
                const validaterror = this.validateAdmin(req)
                if(validaterror)
                    throw new newError(400, 'validaterror', validaterror);

                const admin = await this.adminActions.createAdmin(req.body);
                delete admin.password;
                return res.status(200).json(admin)
            } catch (error) {
                console.log(error);
                return res.status(error.code || 500).json(error);
            }
        }   
    }
    findAdmin(){
        return async(req, res) => {
            try {
                const admin = await this.adminActions.findAdmin(req.query);
                admin.data.forEach(adm => {
                    delete adm.password;    
                });
                return res.status(200).json(admin);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error);
            }
        }
    }
    findAdminById(){
        return async(req, res) =>{
            try {
                const admin = await this.adminActions.findAdminById(parseInt(req.params.id));
                delete admin.password; 
                return res.status(200).json(admin);
            } catch (error) {
                return res.status(error.code || 500).json(error);
            }
        }
    }
    updateAdmin(){
        return async(req, res) => {
            try {
                const validaterror = this.validateAdmin(req);
                if(validaterror)
                    throw new newError(400, 'validaterror', validaterror);
                    
                const admin = await this.adminActions.updateAdmin(parseInt(req.params.id), req.body)
                delete admin.password;
                return res.status(200).json(admin);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error);
            }
        }
    }
    deleteAdmin(){
        return async(req, res) =>{
            try{
                const admin = await this.adminActions.deleteAdmin(req.params.id)
                return res.status(200).json(admin);
            }
            catch(error){
                console.error(error);
                return res.status(error.code || 500).json(error);
            }
        }
    }
}

module.exports = AdminMiddleware;