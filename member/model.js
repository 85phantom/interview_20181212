class Member{
    /**
     *Creates an instance of member.
     * @param {Object} data
     * @param {String} data.name
     * @param {String} data.gender
     * @param {String} data.birthday
     * @memberof member
     */
    constructor(data){
        this.name = data.name;
        this.gender = data.gender;
        this.birthday = new Date(data.birthday).toISOString();
    }
}

module.exports = Member;