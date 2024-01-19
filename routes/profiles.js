import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'
const router = Router()

// GET http://localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET http://localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// POST http://localhost:3000/profiles/cats
router.post('/cats', isLoggedIn, profilesCtrl.createCat)
// DELETE http://localhost:3000/profiles/cats/:catId
router.delete('/cats/:catId', isLoggedIn, profilesCtrl.deleteCat)

export {
  router
}