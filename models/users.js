const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
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
            productId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
        }]
    }
})

userSchema.methods.addToFavoritesList = function(product) {
    console.log('productfromcontroller', product)
    const newlyAddedToFavListIndex = this.favoriteList.items.findIndex(prod => {
        console.log('prod', prod)
        return prod.productId.toString() === product.productId.toString()
    })
    const updatedFavListItems = [...this.favoriteList.items];
    if (newlyAddedToFavListIndex >= 0) {
        return updatedFavListItems
    } else {
        updatedFavListItems.push({
            productId: product._id
        })
    }
    const updatedFavList = {
        items: updatedFavListItems
    }
    this.favoriteList = updatedFavList;
    return this.save()
}


module.exports = mongoose.model('User', userSchema)