import { Schema, model } from 'mongoose';
import { streamingPlatforms } from '../utils/streamingPlatforms.js';

const streamerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Streamer must have a name'],
        trim: true,
        minlength: [3,'Streamer name must contain at least 3 characters'],
        maxlength: [50,'Streamer name cannot contain more than 50 characters']
    },
    description: {
        type: String,
        trim: true,
        required: [true,'Streamer must have a description'],
        maxlength: [250, 'Description cannot contain more than 250 characters']
    },
    streamingPlatform: {
        type: 'String',
        required: [true, 'Streamer must be assigned their main streaming platform'],
        enum: {
            values: streamingPlatforms,
            message: 'The platform is not supported'
        }
    },
    votes: {
        type: Number,
        default: 0
    }
})

const Streamer = model('Streamer', streamerSchema)

export default Streamer