import multer from 'multer';

const storage = multer.memoryStorage();

export const singlefileupload = multer({storage}).single("file");

export default singlefileupload
