class Admin{

    /**
     *Creates an instance of Admin.
     * @param {Object} data
     * @param {String} email
     * @param {String} password
     * @memberof Admin
     */
    constructor(data){
        this.email = data.email;
        this.password = data.password;
    }
}

module.exports = Admin