import multer from "multer";
import path from "path";

// Define onde salvar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Apenas imagens
function fileFilter(req: any, file: Express.Multer.File, cb: any) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Arquivo precisa ser uma imagem"), false);
  }
}

export const upload = multer({ storage, fileFilter });
