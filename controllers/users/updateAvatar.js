// const User = require("../../models/user");
// const fs = require("fs/promises");
// const path = require("path");
// const avatarsDir = path.resolve("public", "avatars");

// const updateAvatar = async (req, res) => {
//     const { _id } = req.user;
//     const { path: oldPath, filename } = req.file;
//     const newPath = path.join(avatarsDir, filename)
//     await fs.rename(oldPath, newPath);

// }