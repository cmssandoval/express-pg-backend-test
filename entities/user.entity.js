/**
 * Representa la entidad de un User.
 * @class
 */
class User {
    /**
     * Crea una instancia de User.
     * @param {String} name Nombre del usuario. 
     * @param {String} email Email del usuario
     * @param {String} password Contraseña del usuario
     */
    constructor ({ name, email, password }){
        this.name       = name;
        this.email      = email;
        this.password   = password;
    }
};

module.exports = User;