const Member = require('./model');
const newError = require('../error')

class MemberAction{
    constructor(options){
        this.db = options.db;
        this.memberPerPage = 10;
    }
    async createMember(data = {}){
        const newMember  = new Member(data);
        try {
            await this.db.insert(newMember).into('Member');
        } catch (error) {
            throw new newError(500, "Something goes wrong!", error);
        } 
        return data
    }
    async findMember(query = {}){
        const page = query.page || 1;
        const skip = (page-1) * this.memberPerPage;
        try {
            const memberList = await this.db('Member').offset(skip).limit(this.memberPerPage);  
            const memberCount = await this.db('Member').count('id AS count')

            return{
                page_total: Math.ceil(memberCount[0].count / this.memberPerPage),
                data: memberList
            }
        } catch (error) {
            throw new newError(500, "Something goes wrong", error);
        }
    }
    
    async updateMember(memberId, data ={}){
        const newMember = new Member(data);
        try {
            console.log(this.db('Member').where({id: memberId}).update(newMember).toString())
            await this.db('Member').where({id: memberId}).update(newMember);
            return newMember;
        } catch (error) {
            return new newError(500, "Something goes wrong", error)
        }
    }
    async deleteMember(memberId){
        try {
            await this.db('Member').where({id: memberId}).del();
        } catch (error) {
            return new newError(500, "Something goes wrong", error)
        }
    }
}

module.exports = MemberAction;