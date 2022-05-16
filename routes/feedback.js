const router = require("express").Router();

router.get("/feedback_test", (req, res) => {
    res.send("Feedback");
});

module.exports = router;