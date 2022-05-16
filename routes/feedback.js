const router = require("express").Router();
const Feedback = require("../models/feedback");

//Create User Feedback
router.post("/", async(req, res) => {
    const newUserFeedback = new Feedback(req.body);

    try{
        const savedUserFeedback = await newUserFeedback.save();
        res.status(200).json(savedUserFeedback);
    }catch (err){
        res.status(500).json(err);
    }
});

//Update User Feedback
router.put("/:id", async (req, res) => {
    try{
        const updateUserFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateUserFeedback);
    }catch (err) {
        res.status(500).json(err);
    } 
});

//Delete
router.delete("/:id", async (req, res) => {
    try{
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json("Feedback has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User Feedback
router.get("/find/:userId", async(req, res) => {
    try{
        const feedback = await Feedback.findOne({userId: req.params.userId});
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All User Feedbacks
router.get("/", checkToken, async (req, res) => {
    try{
        const feedbacks = await Feedback.find()
        res.status(200).json(feedbacks);
    }catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router