const express = require('express');
const axios = require("axios");
const router = express.Router();
const multer = require("multer");
const form = require('form-data');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post("/register", upload.single('image'), function (req, res, next) {
  try {
    const form_register = new form();

    const image_file = fs.readFileSync(
      req.file.path, { encoding: "base64" }
    );

    form_register.append("source", image_file);
    // form_register.append('username', req.username);
    // form_register.append('password', req.password);
    // form_register.append('first_name', req.first_name);
    // form_register.append('last_name', req.last_name);
    // form_register.append('telephone', req.telephone);
    // form_register.append('address', req.address);
    // form_register.append('city', req.city);
    // form_register.append('province', req.province);
    // form_register.append('country', req.country);
    console.log("'/register' call");

    const config = {
        headers: {
          ...form_register.getHeaders(),
        },
        data: form_register
    };

    axios.post(`${process.env.BASE_URL}?key=6d207e02198a847aa98d0a2a901485a5`, form_register,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      res.json({ message: 'Request received!', result: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;