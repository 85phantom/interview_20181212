const Member = require('./model');
const newError = require('../error')

class MemberAction{
    constructor(options){
        this.db = options.db;
    }
    async createMember(data = {}){
        const newMember  = new Member(data);
        try {
            await this.db.insert(newMember).into('Member');
        } catch (error) {
            console.log(error)
            throw error;
        } 
        return data
    }
}

module.exports = MemberAction;