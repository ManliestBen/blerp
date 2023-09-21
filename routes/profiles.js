import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
router.post('/:profileId/cats', isLoggedIn, profilesCtrl.createCat)
router.delete('/cats/:catId', isLoggedIn, profilesCtrl.deleteCat)

export {
  router
}