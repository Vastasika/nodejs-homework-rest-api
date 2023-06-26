// const fs = require("fs/promises");
// const path = require("path");
// const avatarsDir = path.resolve("public", "avatars");

const User = require("../../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { ctrlWrappers, HttpError } = require("../../helpers");

const register = async (req, res) => {
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    //     const { path: oldPath, filename } = req.file;
    // const newPath = path.join(avatarsDir, filename)
    // await fs.rename(oldPath, newPath);

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        email: newUser.email,
        subscription: "starter",
    });
}

module.exports = { register: ctrlWrappers(register) };