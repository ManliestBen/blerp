import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET localhost:3000/tacos
router.get('/', tacosCtrl.index)
// GET localhost:3000/tacos
router.get('/:tacoId', tacosCtrl.show)
// POST localhost:3000/tacos
router.post('/', isLoggedIn, tacosCtrl.create)
// POST localhost:3000/tacos/:tacoId/comments
router.post('/:tacoId/comments', isLoggedIn, tacosCtrl.addComment)
// PATCH localhost:3000/tacos/:tacoId/flip-tasty
router.patch('/:tacoId/flip-tasty', isLoggedIn, tacosCtrl.flipTasty)
// GET localhost:3000/tacos/:tacoId/edit
router.get('/:tacoId/edit', isLoggedIn, tacosCtrl.edit)


export {
  router
}