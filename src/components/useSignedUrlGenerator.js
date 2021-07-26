import React ,{useState} from 'react';
import AWS from "aws-sdk";



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


export const useSignedUrlGenerator = (file) => {

    const [signedUrl , setSignedUrl] = useState('')

    const signedUrlExpireSeconds = 60;
    myBucket.getSignedUrl('putObject', {
        Key: file.name,
        ContentType: file.type,
        // Conditions: [["content-length-range", 100, 10000000]],
        Expires: signedUrlExpireSeconds
    } , (err , url) => {
        setSignedUrl(url)
    });

    return signedUrl
}

