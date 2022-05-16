const router = require("express").Router();
const Feedback = require("../models/feedback");
const { checkToken } = require('../middleware/auth/tokenvalidation');
const feedback = require("../models/feedback");

//Create User Feedback
router.post("/add-feedback", checkToken, async(req, res) => {
   
    try{
        
        await Feedback.create({
            userId: req.user.userID,
            feedback: req.body.populate,
        })

        res.status(200).json({msg:'New feedback is created',success:true});
    }catch (err){
        res.status(500).json(err);
    }
});

//Update User Feedback
router.put("/edit-feedback", checkToken, async (req, res) => {
    try{
        let feedback = await Feedback.findById(req.body.feedback_id);

        if (!feedback) {
            res.status(500).json({ err: 'Item not found in the feedback', success: false })
        }

        await Feedback.findByIdAndUpdate(req.body.feedback_id, {
            feedback: req.body.feedback
        })
    }catch (err) {
        res.status(500).json(err);
    } 
});

//Delete
router.delete("/delete-feedback/:id", checkToken, async (req, res) => {
    try{
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json("Feedback has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All User Feedbacks
router.get("/get-all-feedbacks", checkToken, async (req, res) => {
    try{
        const feedbacks = await Feedback.find()
        res.status(200).json(feedbacks);
    }catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router