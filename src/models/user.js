const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items:[
            {
                count:{
                    type: number, 
                    require: true,
                    default: 1,
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
                
            }
        ]
    }
})

module.exports = model('User', userSchema)