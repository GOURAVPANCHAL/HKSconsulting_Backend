const { createRecord } = require("../controllar/FormControllar")
const upload = require("../middleware/Multer")

const router = require("express").Router()

router.post("/form-send" , upload.single("resume") , createRecord)

module.exports = router