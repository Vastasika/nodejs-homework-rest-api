const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { BASE_URL} = process.env;
const { ctrlWrappers, HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
    const { email,password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: "starter",
    });
}

module.exports = { register: ctrlWrappers(register) };