const { urlShort, getUrl } = require("../controller/urlController")

const router = require("express").Router()

router.route("/urlshort").post(urlShort)
router.route("/:urlId").get(getUrl)

module.exports = router