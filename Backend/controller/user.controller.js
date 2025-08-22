import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
    try{
        const users = await User.find({}, '-password'); // excludes password
        res.status(200).json({users});
    }catch(e){
        return res.status(500).send(e);
    }

}
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).send(e);
  }
}


