import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const isAuthenticated = (req,res,next)=>{

    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed: email and password required",
        });
    }


    const USER_FILE = path.join(__dirname,"../data/user.json");
    if (!fs.existsSync(USER_FILE)) {
        return res.status(500).json({
            success: false,
            message: "Server error: user data not found",
        });
    }
    const users = JSON.parse(fs.readFileSync(USER_FILE, "utf-8"));
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed: invalid email or password",
        });
    }

    req.user = user;
    next();

}


// Yes, the find function in JavaScript returns an object from the array if it matches the condition. If no match is found, it returns undefined.
