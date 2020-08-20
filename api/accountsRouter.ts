import Knex = require("knex");

const express = require("express");
const db: Knex = require("../data/dbConfig");

const router = express.Router();

/*
name	string
budget	numeric

 */

//create
router.post("/", async (req, res, next) => {
    try {
        const [id] = await db.insert({
            name: req.body.name,
            budget: req.body.budget
        }).into("accounts");
        const account = await db("accounts").where("id", id).first();
        res.status(201).json(account);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error creating account"});
    }
});

//read
router.get("/", async (req, res, next) => {
    try {
        const accounts = await db("accounts");
        res.status(200).json(accounts);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error getting accounts"});
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const account = await db("accounts").where("id", req.params.id).first();
        res.status(200).json(account);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error getting account"});
    }
});


//update
router.put("/:id", async (req, res) => {
    try {
        await db("accounts").update({
           name: req.body.name,
            budget: req.body.budget
        }).where("id", req.params.id);
        const account = await db("accounts").where("id", req.params.id).first();
        res.status(200).json(account);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error updating account"});
    }
});

//delete
router.delete("/:id", async (req, res) => {
    const account = await db("accounts").where("id", req.params.id);
    try {
        await db("accounts").where("id", req.params.id).del();
        res.status(200).json({message: "deleted", account});
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error deleting account"});
    }
});


module.exports = router;