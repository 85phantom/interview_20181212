const Admin = require('./model');
const newError = require('../error')
const bcrypt = require('bcrypt');
const saltround = 10;

class AdminAction{
    constructor(options){
        this.db = options.db;
        this.adminPerPage = 10;
    }
    async createAdmin(data = {}){
        const newAdmin = new Admin(data);
        try {
            newAdmin.password = await bcrypt.hash(newAdmin.password, saltround)
            await this.db.insert(newAdmin).into('Admin');
        } catch (error) {
            throw new newError(500, "Something goes wrong!", error);
        } 
        return data
    }
    async findAdmin(query = {}){
        const page = query.page || 1;
        const email = query.email;
        const skip = (page-1) * this.adminPerPage;
        try {
            let adminListQuery = this.db('Admin').offset(skip).limit(this.adminPerPage);  
            let adminCountQuery = this.db('Admin').count('id AS count')
            if(email){
                adminListQuery = adminListQuery.where({email: email})
                adminCountQuery = adminCountQuery.where({email: email})
            }
            const adminList = await adminListQuery
            const totalAdmin = await adminCountQuery
            return{
                page_total: Math.ceil(totalAdmin[0].count / this.adminPerPage),
                data: adminList
            }
        } catch (error) {
            console.error(error)
            throw new newError(500, "Something goes wrong", error);
        }
    }
    
    async updateAdmin(adminId, data ={}){
        const newAdmin = new Admin(data);
        try {
            newAdmin.password = await bcrypt.hash(newAdmin.password, saltround)
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