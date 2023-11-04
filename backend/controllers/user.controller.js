const express = require("express");
const path = require("path");
const router = express.Router();

const upload = require("../multer.js");
const userModel = require("../models/user.model.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
	const { name, email, password } = req.body;
	const userEmail = await userModel.findOne({ email });
    if (userEmail) {
        const filename = req.file.filename;
        const fullPath = `uploads/${filename}`;
        
		return next(new ErrorHandler("User already exists", 400));
	}
	const fileName = req.file.filename;
	const fileUrl = path.join(fileName);
	const avatar = fileUrl;

	const user = {
		name: name,
		email: email,
		password: password,
		avatar: avatar,
	};

	const newUser = await userModel.create(user);
	res.status(201).json({
		success: true,
		newUser,
	});
});

module.exports = router;
