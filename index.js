import express from 'express'
import fileUpload from 'express-fileupload'
import "./config.js"
import { uploadFiles,getFiles,getFile,downloadFile,getFileURL } from './s3.js'

const app = express()
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads"
}))
app.get('/files',async(req,res)=>{
    const result =await getFiles()
    res.json(result.Contents)
})
app.get('/files/:fileName',async(req,res)=>{
     const result = await getFileURL(req.params.fileName)
    res.json({
        url:result
    })
    })

app.get('/downloadFile/:fileName',async(req,res)=>{
     await downloadFile(req.params.fileName)
    res.json('Archivo descargado')
    })
app.post('/files',async (req,res)=>{
   const result = await uploadFiles(req.files.file)
    res.json({result})
})
app.listen(3000)
console.log(`Server on port ${3000}`)