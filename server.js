console.log("TRISHA NEW SERVER VERSION");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// =====================================
// DATABASE CONNECTION
// =====================================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "trish2406",
    database: "questionnaire_db"
});

db.connect((err) => {

    if (err) {
        console.log("Database Error");
        console.log(err);
    }
    else {
        console.log("MySQL Connected Successfully");
    }

});

// =====================================
// ATTRIBUTE APIs
// =====================================

// Get All Attributes
app.get("/attributes", (req, res) => {

    const sql =
    "SELECT * FROM attributes";

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }

    });

});


// Get Single Attribute
app.get("/attribute/:id", (req, res) => {

    const sql =
    "SELECT * FROM attributes WHERE attribute_id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if(err){
                console.log(err);
                res.status(500).json(err);
            }
            else{
                res.json(result[0]);
            }

        }
    );

});


// Add Attribute
app.post("/addAttribute", (req, res) => {

    const {
        attribute_id,
        attribute_name,
        status
    } = req.body;

    const sql = `
    INSERT INTO attributes
    (
        attribute_id,
        attribute_name,
        status
    )
    VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            attribute_id,
            attribute_name,
            status
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Error Adding Attribute");
            }
            else{
                res.send("Attribute Added Successfully");
            }

        }
    );

});


// Update Attribute
app.put("/updateAttribute/:id", (req, res) => {

    const {
        attribute_name,
        status
    } = req.body;

    const sql = `
    UPDATE attributes
    SET
        attribute_name=?,
        status=?
    WHERE attribute_id=?
    `;

    db.query(
        sql,
        [
            attribute_name,
            status,
            req.params.id
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Update Failed");
            }
            else{
                res.send("Attribute Updated");
            }

        }
    );

});


// Delete Attribute
app.delete("/deleteAttribute/:id", (req, res) => {

    const sql =
    "DELETE FROM attributes WHERE attribute_id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Delete Failed");
            }
            else{
                res.send("Attribute Deleted");
            }

        }
    );

});


// =====================================
// ATTRIBUTE VALUE APIs
// =====================================

// Get All Values
app.get("/attributeValues", (req, res) => {

    const sql = `
    SELECT
        av.value_id,
        av.attribute_id,
        a.attribute_name,
        av.value_name,
        av.status
    FROM attribute_values av
    JOIN attributes a
    ON av.attribute_id = a.attribute_id
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }

    });

});


// Get Single Value
app.get("/attributeValue/:id", (req, res) => {

    const sql =
    "SELECT * FROM attribute_values WHERE value_id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if(err){
                console.log(err);
                res.status(500).json(err);
            }
            else{
                res.json(result[0]);
            }

        }
    );

});


// Add Value
app.post("/addAttributeValue", (req, res) => {

    const {
        value_id,
        attribute_id,
        value_name,
        status
    } = req.body;

    const sql = `
    INSERT INTO attribute_values
    (
        value_id,
        attribute_id,
        value_name,
        status
    )
    VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            value_id,
            attribute_id,
            value_name,
            status
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Error Adding Value");
            }
            else{
                res.send("Value Added Successfully");
            }

        }
    );

});


// Update Value
app.put("/updateAttributeValue/:id", (req, res) => {

    const {
        attribute_id,
        value_name,
        status
    } = req.body;

    const sql = `
    UPDATE attribute_values
    SET
        attribute_id=?,
        value_name=?,
        status=?
    WHERE value_id=?
    `;

    db.query(
        sql,
        [
            attribute_id,
            value_name,
            status,
            req.params.id
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Update Failed");
            }
            else{
                res.send("Value Updated");
            }

        }
    );

});


// Delete Value
app.delete("/deleteAttributeValue/:id", (req, res) => {

    const sql =
    "DELETE FROM attribute_values WHERE value_id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Delete Failed");
            }
            else{
                res.send("Value Deleted");
            }

        }
    );

});
// =====================================
// GET ATTRIBUTES FOR ATTRIBUTE POSITION
// =====================================

app.get("/attributes", (req, res) => {

    const sql = `
    SELECT
        attribute_id,
        attribute_name,
        attribute_type
    FROM attributes
    WHERE status='Active'
    ORDER BY attribute_name
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }

    });

});
function updateType(dropdown){

    const selected =
    dropdown.options[
        dropdown.selectedIndex
    ];

    const type =
    selected.getAttribute("data-type");

    const row =
    dropdown.parentElement.parentElement;

    row.querySelector(".typeBox").value =
    type || "";

}


// =====================================
// QUESTION CRITERIA APIs
// =====================================

// Get Criteria
app.get("/questionCriteria", (req, res) => {

    const sql = `
    SELECT
        qc.config_id,
        a.attribute_id,
        a.attribute_name,
        qc.is_selected
    FROM question_criteria qc
    JOIN attributes a
    ON qc.attribute_id = a.attribute_id
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }

    });

});


// Save Criteria
app.post("/saveCriteria", (req, res) => {

    const criteria = req.body;

    db.query(
        "DELETE FROM question_criteria",
        (err) => {

            if(err){
                console.log(err);
                return res.send("Error");
            }

            criteria.forEach(item => {

                db.query(
                    `
                    INSERT INTO question_criteria
                    (
                        attribute_id,
                        is_selected
                    )
                    VALUES (?, ?)
                    `,
                    [
                        item.attribute_id,
                        item.is_selected
                    ]
                );

            });

            res.send(
                "Criteria Saved Successfully"
            );

        }
    );

});

// =====================================
// QUESTION APIs
// =====================================

// Get All Questions
app.get("/questions", (req, res) => {

    db.query(
        "SELECT * FROM questions",
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.json(result);
            }

        }
    );

});


// Get Single Question
app.get("/question/:id", (req, res) => {

    db.query(
        "SELECT * FROM questions WHERE question_id=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.json(result[0]);
            }

        }
    );

});


// Add Question
app.post("/addQuestion", (req, res) => {

    const {
        question_id,
        question_text,
        attribute_id,
        status
    } = req.body;

    const sql = `
    INSERT INTO questions
    (
        question_id,
        question_text,
        attribute_id,
        status
    )
    VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            question_id,
            question_text,
            attribute_id,
            status
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Error Adding Question");
            }
            else {
                res.send("Question Added Successfully");
            }

        }
    );

});


// Update Question
app.put("/updateQuestion/:id", (req, res) => {

    const id = req.params.id;

    const {
        question_text,
        attribute_id,
        status
    } = req.body;

    const sql = `
    UPDATE questions
    SET question_text=?,
        attribute_id=?,
        status=?
    WHERE question_id=?
    `;

    db.query(
        sql,
        [
            question_text,
            attribute_id,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Update Failed");
            }
            else {
                res.send("Question Updated");
            }

        }
    );

});


// Delete Question
app.delete("/deleteQuestion/:id", (req, res) => {

    db.query(
        "DELETE FROM questions WHERE question_id=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Delete Failed");
            }
            else {
                res.send("Question Deleted");
            }

        }
    );

});


// =====================================
// TEST ROUTE
// =====================================

app.get("/test", (req, res) => {

    res.send("SERVER WORKING");

});
app.get("/attributeValues", (req, res) => {

    const sql = `
    SELECT
        av.value_id,
        av.attribute_id,
        a.attribute_name,
        av.value_name,
        av.status
    FROM attribute_values av
    JOIN attributes a
    ON av.attribute_id = a.attribute_id
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.json(result);
        }

    });

});


// =====================================
// START SERVER
// =====================================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});
app.get("/trisha", (req, res) => {
    res.send("TRISHA ROUTE WORKING");
});