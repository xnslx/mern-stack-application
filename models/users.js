const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    favoriteList: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true }
        }]
    },
    shoppingCart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
            quantity: { type: Number, required: true }
        }]
    }
})

userSchema.methods.addToFavoritesList = function(product) {
    const newlyAddedToFavListItemIndex = this.favoriteList.items.findIndex(prod => {
        return prod.productId.toString() === product._id.toString()
    })
    const updatedFavListItems = [...this.favoriteList.items]
    if (newlyAddedToFavListItemIndex >= 0) {
        return updatedFavListItems;
    } else {
        updatedFavListItems.push({ productId: product._id })
    }
    const updatedList = {
        items: updatedFavListItems
    }
    this.favoriteList = updatedList;
    return this.save()
}

userSchema.methods.removeProductFromFavList = function(productId) {
    console.log('removeProductFromFavList', productId)
    const needToBeRemovedProductIndex = this.favoriteList.items.findIndex(prod => {
        return prod.productId.toString() === productId.toString()
    })
    const removedProductItem = this.favoriteList.items.splice(needToBeRemovedProductIndex, 1)
    console.log('removedProductItem', removedProductItem)
    this.favoriteList = this.favoriteList
    return this.save()
}

userSchema.methods.addToShoppingCart = function(product) {
    const newlyAddedToCartItemIndex = this.shoppingCart.items.findIndex(prod => {
        return prod.productId.toString() === product._id.toString()
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.shoppingCart.items]
    if (newlyAddedToCartItemIndex >= 0) {
        newQuantity = this.shoppingCart.items[newlyAddedToCartItemIndex].quantity + 1
        updatedCartItems[newlyAddedToCartItemIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity })
    }
    const updatedCart = {
        items: updatedCartItems
    }
    this.shoppingCart = updatedCart;
    return this.save()
}

userSchema.methods.removeProductFromShoppingCart = function(productId) {
    const needToBeRemovedProductIndex = this.shoppingCart.items.findIndex(prod => {
        return prod.productId.toString() === productId.toString()
    })
    const removedProductItem = this.shoppingCart.items.splice(needToBeRemovedProductIndex, 1)
    this.shoppingCart = this.shoppingCart
    return this.save()
}

userSchema.methods.clearCart = function() {
    this.shoppingCart = { items: [] }
    return this.save()
}


module.exports = mongoose.model('User', userSchema)