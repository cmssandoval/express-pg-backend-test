/**
 * Represents a User entity.
 * @class
 */
class User {
    /**
     * Creates a User instance.
     * @param {String} name User name. 
     * @param {String} email User email.
     * @param {String} password User password.
     */
    constructor ({ name, email, password }){
        this.name       = name;
        this.email      = email;
        this.password   = password;
    }
};

module.exports = User;