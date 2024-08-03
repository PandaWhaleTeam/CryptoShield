const express = require('express');
const tiApiController = require('../controllers/tiApiController');
const SB_controller = require('../supabaseClient')
const router = express.Router();



// GET Requests to retrieve data using the middleware routes


router.post('/getFav', SB_controller.get_fav, (req, res) => {
  return res.status(200);
})

router.post('/addFav', SB_controller.add_fav, (req, res) => {
  return res.status(200);
})

router.post('/deleteFav', SB_controller.delete_fav, (req, res) => {
  return res.status(200);
})


router.get('/coins', tiApiController.coinListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/ratings', tiApiController.ratingListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/completeCoin/:id', tiApiController.completeCoinMiddleware, (req, res) => {
  return res.status(200).json(res.locals.completeCoin);
});

router.get('/historyCoin/:id', tiApiController.historyCoinMiddleware, (req, res) => { // Updated to use dynamic middleware
  return res.status(200).json(res.locals);
});

router.post('/login', SB_controller.verifyUser, (req, res) => {
  //user_id = res.locals.userId
  console.log('res.locals.userId',res.locals.userId)
  console.log('res.locals.userId',res.locals.username)
  return res.status(200).json({ userId: res.locals.userId, username: res.locals.username })
});

router.post('/googlelogin', SB_controller.verifyGoogleUser, (req, res) => {
  //user_id = res.locals.userId
  console.log('res.locals.userId',res.locals.userId)
  console.log('res.locals.userId',res.locals.username)
  return res.status(200).json({ userId: res.locals.userId, username: res.locals.username })
});


router.post('/signUp', SB_controller.addUser, (req, res) => {
  return res.status(200).json({message: 'this is working'})
})



// router.get("/auth/callback", async function (req, res) {
//   const code = req.query.code
//   const next = req.query.next ?? "/"

//   if (code) {
//     const supabase = createServerClient(
//       process.env.SUPABASE_URL,
//       // replaced SUPABASE_ANON_KEY to SUPABASE_KEY
//       process.env.SUPABASE_KEY, {
//     cookies: {
//       getAll() {
//         return parseCookieHeader(context.req.headers.cookie ?? '')
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value, options }) =>
//           context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
//         )
//       },
//     },
//   })
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   res.redirect(303, `/${next.slice(1)}`)
// })


module.exports = router;