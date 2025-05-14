const express = require('express');
const router = express.Router();
module.exports=router;
const userMid = require("../middleware/middlewareUsers");


router.get("/Add", (req, res) => {
    res.render("users_add", { data: {} });
});
router.post("/Add", [userMid.AddUser], (req, res) => {
    res.redirect("/Users/List");
});
router.get("/Edit/:id", [userMid.GetOneUser], (req, res) => {
    if (req.GoodOne) {
        res.render("users_add", { data: req.one_user_data });
    } else {
        res.redirect("/Users/List");
    }
});
router.post("/Edit/:id", [userMid.UpdateUser], (req, res) => {
    res.redirect("/Users/List");
});
router.get("/List", [userMid.GetAllUsers], (req, res) => {
    res.render("users_list", {
        page_title: "רשימת המשתמשים",
        users: req.users_data,
    });
});
router.post("/Delete", [userMid.DeleteUser], (req, res) => {
    res.redirect("/Users/List");
});


