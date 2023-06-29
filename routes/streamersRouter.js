import  {Router} from 'express'
import { getAllStreamers, getStreamer, uploadStreamer, voteForStreamer } from '../controllers/streamersController.js'

const router = Router()

router.post('/',uploadStreamer)
router.get('/',getAllStreamers)


router.get('/:id',getStreamer)
router.put('/:id/vote',voteForStreamer)

export default router