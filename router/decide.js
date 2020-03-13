const router = require('express').Router();

router.post('/decide', (req, res) => {
  const { width, height } = req.body;
  console.log(width);
  console.log(height);
  res.json({ param: width, height })
});

// router.post('/decide2', (req, res) => {
//   const { width, height } = req.body;
//   console.log(width);
//   console.log(height);
//   res.json({ param: width, height })
// });

const parametr = [];

router.post('/decide2', async function (req, res) {
  const valueFilds = await { width: req.body.width, height: req.body.height }
  parametr.push(valueFilds);
  res.json({ parametr: parametr })
})

router.post('/clear', (req,res)=>{
      parametr.splice(0);
      res.json(parametr);
});
module.exports = router;


