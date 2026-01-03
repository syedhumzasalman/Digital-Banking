import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads", { recursive: true });
        }
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

export const upload = multer({ storage });
