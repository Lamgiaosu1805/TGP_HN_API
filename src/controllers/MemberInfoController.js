const qrcode = require('qrcode');
const { google } = require('googleapis');
const apikeys = require('../../apikey.json');
const fs = require('fs');
const MemberInfo = require('../models/MemberInfo');
const XuDoan = require('../models/XuDoan');
const SCOPE = ["https://www.googleapis.com/auth/drive"]

const authorize = async () => {
    const jwtClient = new google.auth.JWT(
        process.env.API_CLIENT_EMAIL,
        null,
        process.env.API_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
        const body = req.body;
        const filename = `${body.saintName + body.fullname}`.replaceAll(" ", "").trim();
        try {
            //Chua thêm Transaction
            const newMemberInfo = new MemberInfo({
                saintName: body.saintName,
                fullname: body.fullname,
                dateOfBirth: body.dateOfBirth,
                idCapKhan: body.idCapKhan,
                idChucVuXuDoan: body.idChucVuXuDoan,
                idXuDoan: body.idXuDoan,
            });
            const newMember = await newMemberInfo.save();
            authorize()
                .then((auth) => uploadFile(auth, filename, newMember._id.toString()))
                .then((data) => {
                    fs.unlink(`${filename}.png`, function (err) {
                        if (err) throw err;
                    });
                    MemberInfo.findOneAndUpdate({_id: newMember._id}, {QRCodeUrl: `https://drive.google.com/uc?id=${data.data.id}`})
                        .then((resp) => {
                            resp.QRCodeUrl = `https://drive.google.com/uc?id=${data.data.id}`
                            res.json({
                                message: "create successfully",
                                code: 200,
                                data: resp
                            });
                        })
                        .catch(e => {
                            console.log(e.errors);
                            res.json({
                                code: 500,
                                message: e.errors
                            })
                        })
                })

        } catch (error) {
            console.log(error)
            res.json({
                code: 500,
                message: error
            })
        };
    }

    async getAllMemberXuDoan (req, res, next) {
        const user = req.user;
        try {
            const xuDoan = await XuDoan.findOne({idAccount: user.id})
            const memberXuDoan = await MemberInfo.find({idXuDoan: xuDoan.id})
            res.json({
                code: 200,
                data: memberXuDoan
            })
        } catch (error) {
            console.log(error);
            res.json({
                code: 500,
                message: error
            })
        }
    }
}
module.exports = new MemberInfoController