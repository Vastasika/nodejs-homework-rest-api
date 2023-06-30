const express = require('express');

const {register,login,getCurrent,logout, updateAvatar, verify, resendVerify} = require("../../controllers/users");

const schemas = require("../../schemas/user");

const { validateBody, authenticate, upload } = require("../../middlewares");


const router = express.Router();

router.post('/register', upload.single("avatar"), validateBody(schemas.userRegisterSchema), register);

router.get('/verify/:verificationToken', verify);

router.post('/verify',validateBody(schemas.userEmailSchema),resendVerify);

router.post('/login', validateBody(schemas.userLoginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars",authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
