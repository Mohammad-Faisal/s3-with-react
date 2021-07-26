import React ,{useState} from 'react';
import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: 'ACCESS_KEY',
    secretAccessKey: 'SECRET_KEY',
})

const S3_BUCKET ='BUCKET_NAME';
const REGION ='REGION';

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


const UploadImageToS3WithNativeSdk = () => {


    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {


        const signedUrlExpireSeconds = 60;
        myBucket.getSignedUrl('putObject', {
            Key: file.name,
            ContentType: file.type,
            // Conditions: [["content-length-range", 100, 10000000]],
            Expires: signedUrlExpireSeconds
        } , (err , url) => {
            fetch(url , {
                method:'PUT',
                body :file
            }).then((res) => {
                myBucket.getSignedUrl('getObject' , {
                    Key: file.name,
                    Expires: signedUrlExpireSeconds
                } , (err , res) => {
                    console.log('the final download url is ' , res);
                })
            })
        });
    }


    return <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;