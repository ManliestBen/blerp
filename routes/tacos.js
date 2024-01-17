import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'

const router = Router()

// GET localhost:3000/tacos
router.get('/', tacosCtrl.index)

export {
  router
}