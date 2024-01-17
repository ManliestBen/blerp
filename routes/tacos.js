import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET localhost:3000/tacos
router.get('/', tacosCtrl.index)
// POST localhost:3000/tacos
router.post('/', isLoggedIn, tacosCtrl.create)

export {
  router
}