import mongoose from 'mongoose'

export default mongoose.model('Users', mongoose.Schema({
    first_name: { type: String, index: true },
    last_name: String,
    email: String,
    gender: String
}))