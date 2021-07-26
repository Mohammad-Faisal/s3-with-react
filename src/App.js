import './App.css';
import UploadImageToS3WithNativeSdk from "./components/UploadImageToS3WithNativeSdk";
import UploadImageToS3WithNativeSdkWithCognito from "./components/UploadImageToS3WithNativeSdkWithCognito";
import UploadImageToS3WithReactS3 from "./components/UploadImageToS3WithReactS3";

function App() {
  return (
    <div style={{padding:"20px" , display:"grid" , gridTemplateRows: "1fr" , gridRowGap:"20px"}}>
      <UploadImageToS3WithNativeSdk />
      <UploadImageToS3WithNativeSdkWithCognito />
      <UploadImageToS3WithReactS3 />
    </div>
  );
}

export default App;
