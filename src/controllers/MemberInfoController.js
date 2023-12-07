const qrcode = require('qrcode');
const { google } = require('googleapis');
const apikeys = require('../../apikey.json');
const fs = require('fs');
const MemberInfo = require('../models/MemberInfo');
const SCOPE = ["https://www.googleapis.com/auth/drive"]

const authorize = async () => {
    const jwtClient = new google.auth.JWT(
        process.env.API_CLIENT_EMAIL,
        null,
        Buffer.from(process.env.API_PRIVATE_KEY, 'base64').toString('ascii'),
        SCOPE
    )

    await jwtClient.authorize();
    return jwtClient;
}

const uploadFile = (authClient, filename, data) => {
    return new Promise(async (resolve, rejected) => {
        const drive = google.drive({version: 'v3', auth: authClient});
        var fileMetaData = {
            name: filename,
            parents: ["1YW7KMuEWLO_AwYTM2mUwndni7-uKHlxa"]
        }
        
        const writableStream = fs.createWriteStream(`${filename}.png`);
        qrcode.toFileStream(writableStream, data, {
            type: 'png',
            width: 400,
            height: 400,
        });
        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream(`${filename}.png`),
                mimeType: 'image/png'
            },
            fields: 'id'
        }, (err, file) => {
            if(err) {
                return rejected(err)
            }
            resolve(file);
        });

    })
}
class MemberInfoController{
    async create(req, res, next) {
        const body = req.body
        try {
            authorize()
                .then((auth) => 
                    uploadFile(auth, body.fileName, body.data)
                )
                .then((data) => {
                    fs.unlink(`${body.fileName}.png`, function (err) {
                        if (err) throw err;
                    });
                    const newMemberInfo = new MemberInfo({
                        saintName: body.saintName,
                        fullname: body.fullname,
                        dateOfBirth: body.dateOfBirth,
                        idCapKhan: body.idCapKhan,
                        idChucVuXuDoan: body.idChucVuXuDoan,
                        idXuDoan: body.idChucVuXuDoan,
                        QRCodeUrl: `https://drive.google.com/uc?id=${data.data.id}`
                    })
                    newMemberInfo.save()
                        .then(() => res.json({message: "create successfully"}))
                        .catch(e => {
                            console.log(e.errors)
                            res.status(500).json(e.errors)
                        })
                })
                .catch("E")
        } catch (error) {
            console.log(error)
            res.status(500).json(error) 
        }
    }
}
module.exports = new MemberInfoController