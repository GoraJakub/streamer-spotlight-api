import Streamer from "../models/streamerModel.js";
import AppError from "../utils/appError.js";
import catchCustom from "../utils/catchCustom.js";

export const getAllStreamers = catchCustom(async (req,res) => {
    const streamers = await Streamer.find()

    res.status(200).json({
        status: 'success',
        data: {
            streamers
        }
    })
})

export const getStreamer = catchCustom(async (req,res,next) => {
    const streamer = await Streamer.findById(req.params.id)

    if(!streamer) return next(new AppError('There is no streamer with given ID',404))

    res.status(200).json({
        status: 'success',
        data: {
            streamer
        }
    })
})

export const uploadStreamer = catchCustom(async (req,res) => {
    const newStreamer = await Streamer.create({
        name: req.body.name,
        description: req.body.description,
        streamingPlatform: req.body.streamingPlatform
    })

    res.status(201).json({
        status: 'success',
        data: {
            streamer: newStreamer
        }
    })
})

export const voteForStreamer = catchCustom(async (req,res,next) => {
    const vote = await Streamer.findByIdAndUpdate(req.params.id ,{ $inc: {votes: 1} },{new: true})

    if(!vote) return next(new AppError('There is no streamer with given ID',404))

    res.status(200).json({
        status: 'success',
        data: {
            vote
        }
    })
})



