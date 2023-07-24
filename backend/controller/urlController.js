const urlModel = require("../model/urlModel");
var uniqueId = require("generate-password");
const isUrlValid = require("url-validation");

exports.urlShort = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.send({ message: "URL not found!", success: false });
  }

  if (!isUrlValid("https://sindresorhus.com")) {
    return res.send({ message: "URL is not valid!", success: false });
  }

  var urlId = uniqueId.generate({
    length: 6,
    numbers: true,
  });
  console.log(urlId);
  let count = 0;
  count = count + 1;

  const shortUrl = req.protocol + "://" + req.get("host") + "/" + urlId;
  console.log(shortUrl);
  const url = await urlModel.create({
    longUrl,
    shortUrl,
    count,
    urlId,
  });

  if (!url) {
    return res.send({ message: "URL not found!", success: false });
  }

  return res.send({ message: "Here is shorted your", success: true, url });

  // return res.send({ message: "URL not found!", success: false });
};

exports.getUrl = async (req, res) => {
  const { urlId } = req.params;

  const url = await urlModel.findOne({ urlId });
  if (!url) {
    return res.send({ message: "Invalid URL", success: false });
  }
  console.log(url);
  res.redirect(url.longUrl);
};
