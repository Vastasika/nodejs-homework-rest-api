const Jimp = require("jimp")
const fs = require("fs/promises");
const path = require("path");
const { ctrlWrappers, HttpError } = require("../../helpers");
const User = require("../../models/user");
const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
  const image = await Jimp.read(oldPath);
  await image
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .write(oldPath);

    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    
    if (!_id) {
        throw HttpError(401, "Email or password is wrong"); 
    }

    res.json({
        avatarURL,
    })
}

module.exports = { updateAvatar: ctrlWrappers(updateAvatar) };