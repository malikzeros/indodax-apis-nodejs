
let httpBuildQuery = require("http-build-query");
let crypto = require("crypto");
const request = require("request");
const { exit } = require("process");
let key = "";
let secretKey =
  "";
  
let data = {
  method: "getInfo",
  timestamp: "1578304294000",
  recvWindow: "1578303937000",
};
let post_data = httpBuildQuery(data, "", "&");
let sign = signHmacSha512(secretKey, post_data);

const options = {
  // url: "https://vip.bitcoin.co.id/api/btc_idr/ticker",
  url: "https://indodax.com/tapi",
  method: "POST",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36",
    Key: key,
    Sign: sign,
  },
  form: post_data,
  // body: body,
  // url: url,
};

request(options, function (error, response, body) {
  // console.log(response.body);
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.
});
function signHmacSha512(key, str) {
  let hmac = crypto.createHmac("sha512", key);
  let signed = hmac.update(Buffer.from(str, "utf-8")).digest("hex");
  return signed;
}
