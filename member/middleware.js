
class MemberMiddleware{
    constructor(options){
        this.memberActions = options.memberActions;
    }

    createMember(){
        return async(req, res) => {
            console.log(req.body);
            try {
                const members = await this.memberActions.createMember(req.body);
                return res.status(200).json(members)
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message|| error);
            }
        }   
    }
    findMember(){
        return async(req, res) => {
            try {
                const member = await this.memberActions.findMember(req.query);
                return res.status(200).json(member);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    updateMember(){
        return async(req, res) => {
            try {
                const member = await this.memberActions.updateMember(parseInt(req.params.id), req.body)
                return res.status(200).json(member);
            } catch (error) {
                console.error(error);
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
    deleteMember(){
        return async(req, res) =>{
            try{
                const member = await this.memberActions.deleteMember(req.params.id)
                return res.status(200).json(member);
            }
            catch(error){
                return res.status(error.code || 500).json(error.message || error);
            }
        }
    }
}

module.exports = MemberMiddleware;