import multer from "multer"; // Importa o Multer, middleware para upload de arquivos no Express
import path from "path"; // Importa o path para manipulação de extensões de arquivos

// Configuração de armazenamento do Multer:
// Define onde e como os arquivos enviados serão salvos no servidor
const storage = multer.diskStorage({
  // Define a pasta onde os arquivos serão salvos
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Salva na pasta 'uploads'
  },
  // Define o nome do arquivo salvo, adicionando um sufixo único para evitar conflitos
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Gera um sufixo único
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Mantém a extensão original
  },
});

// Função para filtrar arquivos permitidos:
// Apenas arquivos de imagem são aceitos (mimetype começa com "image/")
function fileFilter(req: any, file: Express.Multer.File, cb: any) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Aceita o arquivo
  } else {
    cb(new Error("Arquivo precisa ser uma imagem"), false); // Rejeita o arquivo
  }
}

// Exporta o middleware de upload já configurado
export const upload = multer({ storage, fileFilter });
