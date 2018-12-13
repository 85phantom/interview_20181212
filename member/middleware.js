
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
                return res.status(error.code || 500).json(error.message|| error);
            }
        }
        
    }
}

module.exports = MemberMiddleware;