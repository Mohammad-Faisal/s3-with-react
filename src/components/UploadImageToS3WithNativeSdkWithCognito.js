import React ,{useState} from 'react';
import AWS from 'aws-sdk'


const S3_BUCKET ='BUCKET_NAME';
const REGION ='REGION_NAME';
const IDENTITY_POOL_ID = "ap-southeast-2:34bb7d25-57c3-421b-99aa-0bb93a599433";


AWS.config.region =REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId:IDENTITY_POOL_ID
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET ,Prefix:'test-folder/another-folder/'},
    region: REGION,
})


const UploadImageToS3WithNativeSdkWithCognito = () => {

    const [images , setImages] = useState([]);
    const [singleImage , setSingleImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        myBucket.listObjects({ Delimiter: "/" }, function(err, data) {

            console.log(data.Contents)
            const prefix = 'https://security-implementatoin.s3-ap-southeast-2.amazonaws.com/'
            setImages()

            data.Contents.map(singleItem => {
                console.log(singleItem.Key)
                const url  = `${prefix}${singleItem.Key}`
                myBucket.getObject({Key : singleItem.Key}).
                promise().
                then(data => {
                    let image = new Buffer(data.Body).toString('base64');
                    image = "data:"+data.ContentType+";base64,"+image;
                    setSingleImage(image);
                })
            })

            myBucket.getObject()

        })
    }


    return <div>
        <div>Native SDK File Upload with Cognito Progress %</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        <img src={singleImage} />
    </div>
}

export default UploadImageToS3WithNativeSdkWithCognito;