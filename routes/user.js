const router = require("express").Router();
const verify = require("../util/verify");

router.route("/").post((req, res) => {
  let token = req.body.token;
  verify(token).then((response) => {
    if (response) {
      res.json({ auth: "success" });
    } else {
      res.json({ auth: "failed" });
    }
  });
});

module.exports = router;
