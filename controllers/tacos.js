import { Taco } from "../models/taco.js"

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
  req.body.owner = req.user.profile._id
  req.body.tasty = !!req.body.tasty
  Taco.create(req.body)
  .then(taco => {
    res.redirect('/tacos')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function show(req, res) {
  Taco.findById(req.params.tacoId)
  .populate([
    {path: "owner"},
    {path: "comments.author"}
  ])
  .then(taco => {
    res.render('tacos/show', {
      taco,
      title: "🌮 show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function flipTasty(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    taco.tasty = !taco.tasty
    taco.save()
    .then(()=> {
      res.redirect(`/tacos/${taco._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/tacos")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function edit(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    res.render('tacos/edit', {
      taco,
      title: "edit 🌮"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function update(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    if (taco.owner.equals(req.user.profile._id)) {
      req.body.tasty = !!req.body.tasty
      taco.updateOne(req.body)
      .then(() => {
        res.redirect(`/tacos/${taco._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function addComment(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    req.body.author = req.user.profile._id
    taco.comments.push(req.body)
    taco.save()
    .then(()=> {
      res.redirect(`/tacos/${taco._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/tacos')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function deleteTaco(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    if (taco.owner.equals(req.user.profile._id)) {
      taco.deleteOne()
      .then(() => {
        res.redirect('/tacos')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function editComment(req, res) {
  // find the taco using it's _id
  Taco.findById(req.params.tacoId)
  .then(taco => {
    // find the comment using it's _id
    const comment = taco.comments.id(req.params.commentId)
    // check to make sure user owns comment
    if (comment.author.equals(req.user.profile._id)) {
      // render a view passing the taco and comment and a title
      res.render('tacos/editComment',{
        taco,
        comment,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function updateComment(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    const comment = taco.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      taco.save()
      .then(() => {
        res.redirect(`/tacos/${taco._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/tacos')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function deleteComment(req, res) {
  Taco.findById(req.params.tacoId)
  .then(taco => {
    const comment = taco.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      taco.comments.remove(comment)
      taco.save()
      .then(() => {
        res.redirect(`/tacos/${taco._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/tacos')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

export {
  index,
  create,
  show,
  flipTasty,
  edit,
  addComment,
  update,
  deleteTaco as delete,
  editComment,
  updateComment,
  deleteComment
}