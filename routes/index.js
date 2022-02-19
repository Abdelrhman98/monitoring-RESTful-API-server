var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const x = testSchema({name:"asdasd"})
  const result = await x.save()
  console.log(result);
  res.send(result)
});


router.get('/add_version', async (req, res, next)=>{
  const x = version({versionFor:"seriveRepo", version:(12.10).toFixed(2)})
  const result = await x.save()
  res.send(result)
})  
module.exports = router;
