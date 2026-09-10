/**
 * Represents a Product entity.
 * @class
 */
class Product {
    /**
     * Creates a Product instance.
     * @param {String} title Product title. 
     * @param {Number} price Product price.
     * @param {String} description Product description.
     * @param {Number} stock Product stock.
     * @param {String} imageURL Product image URL.
     */
    constructor ({ title, price, description, stock, imageURL }){
        this.title          = title;
        this.price          = price;
        this.description    = description;
        this.stock          = stock;
        this.imageURL       = imageURL;
    }
};

module.exports = Product;