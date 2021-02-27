import mongoose from 'mongoose';

let userStatSchema = new mongoose.Schema({
    rank: String, 
    pp: String, 
    plays: String, 
    acc: String, 
    player: String, 
    date: Number, 
    id: String
})

const UserStat = mongoose.model('userstat', userStatSchema);

export default UserStat;