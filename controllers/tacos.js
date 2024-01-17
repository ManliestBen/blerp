import { Taco } from "../models/taco.js";

function index(req, res) {
  Taco.find({})
  .then(tacos => {
    res.render('tacos/index', {
      tacos,
      title: "🌮"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  console.log(req.user)
  req.body.owner = req.user.profile._id
}

export {
  index,
  create
}