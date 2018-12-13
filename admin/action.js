const Admin = require('./model');
const newError = require('../error')

class AdminAction{
    constructor(options){
        this.db = options.db;
        this.adminPerPage = 10;
    }
    async createAdmin(data = {}){
        const newAdmin = new Admin(data);
        try {
            await this.db.insert(newAdmin).into('Admin');
        } catch (error) {
            throw new newError(500, "Something goes wrong!", error);
        } 
        return data
    }
    async findAdmin(query = {}){
        const page = query.page || 1;
        const skip = (page-1) * this.adminPerPage;
        try {
            const adminList = await this.db('Admin').offset(skip).limit(this.adminPerPage);  
            const adminCount = await this.db('Admin').count('id AS count')

            return{
                page_total: Math.ceil(adminCount[0].count / this.adminPerPage),
                admin: adminList
            }
        } catch (error) {
            throw new newError(500, "Something goes wrong", error);
        }
    }
    
    async updateAdmin(adminId, data ={}){
        const newAdmin = new Admin(data);
        try {
            await this.db('Admin').where({id: adminId}).update(newAdmin);
            return newAdmin;
        } catch (error) {
            return new newError(500, "Something goes wrong", error)
        }
    }
    async deleteAdmin(adminId){
        try {
            await this.db('Admin').where({id: adminId}).del();
        } catch (error) {
            return new newError(500, "Something goes wrong", error)
        }
    }
}

module.exports = AdminAction;