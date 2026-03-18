import mutler from 'mutler';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '..', 'uploads');
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

// storage config---------

const storage = mutler.diskStorage({
    destination: (req, file, cd) => {
        cd (null, uploadDir)
    },
    
})

