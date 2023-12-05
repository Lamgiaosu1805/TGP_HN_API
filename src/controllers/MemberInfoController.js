const qrcode = require('qrcode');
const credentials = require('../../credentials.json');
const {Storage} = require('@google-cloud/storage');

class MemberInfoController{
    async create(req, res, next) {
        try {
            const drive = new Storage({ credentials })
            const data = req.body;
            const code = await qrcode.toDataURL(data.fullname)
            const fileName = data.fileName;
            const fileData = code;
            const file = {
                name: fileName,
                mimeType: "image/png",
            }
            const blob = new Blob([fileData], { type: file.mimeType });
            const fileMetadata = await drive.files().create({
                name: file.name,
                mimeType: file.mimeType,
                data: blob,
              });
              res.json({
                url: fileMetadata.webViewLink,
              });
        } catch (error) {
            console.log(error)
            res.status(500).json(error) 
        }
    }
}
module.exports = new MemberInfoController