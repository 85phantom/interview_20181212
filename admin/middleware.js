
class AdminMiddleware{
    constructor(options){
        this.adminActions = options.adminActions;
    }

    createAdmin(){
        return async(req, res) => {
            console.log(req.body);
            try {
                const admin = await this.adminActions.createAdmin(req.body);
                return res.status(200).json(admin)
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message|| error);
            }
        }   
    }
    findAdmin(){
        return async(req, res) => {
            try {
                const admin = await this.adminActions.findAdmin(req.query);
                return res.status(200).json(admin);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    updateAdmin(){
        return async(req, res) => {
            try {
                const admin = await this.adminActions.updateAdmin(parseInt(req.params.id), req.body)
                return res.status(200).json(admin);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
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
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
}

module.exports = AdminMiddleware;