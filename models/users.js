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
    }
})

userSchema.methods.addToFavoritesList = function(product) {
    console.log('addToFavoritesList', product)
    const newlyAddedToFavListItemIndex = this.favoriteList.items.findIndex(prod => {
        return prod.productId.toString() === product._id.toString()
    })
    console.log('newlyAddedToFavListItemIndex', newlyAddedToFavListItemIndex)
    const updatedFavListItems = [...this.favoriteList.items]
    if (newlyAddedToFavListItemIndex >= 0) {
        return updatedFavListItems;
    } else {
        updatedFavListItems.push({ productId: product._id })
    }
    const updatedList = {
        items: updatedFavListItems
    }
    this.favoriteList = updatedList
    console.log('updatedFavListItems', updatedFavListItems)
    return this.save()
}


module.exports = mongoose.model('User', userSchema)