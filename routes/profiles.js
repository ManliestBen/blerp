import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'
const router = Router()

// GET http://localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET http://localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// POST http://localhost:3000/profiles/:profileId/cats
router.post('/:profileId/cats', isLoggedIn, profilesCtrl.createCat)

export {
  router
}