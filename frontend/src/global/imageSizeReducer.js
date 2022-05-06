import Resizer from "react-image-file-resizer";


 export const resizeFile = async(file) =>{
    let base64="";
     var size=file.size/1024;
     console.log(size);
     if(size<200){

        return  new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                base64=reader.result;
                resolve(base64);
    
                // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(file);
          });
        
       
        
      
        
     }else{
        return  new Promise((resolve) => {
            Resizer.imageFileResizer(
              file,
              300,
              300,
              "JPEG/PNG/WEBP",
              100,
              0,
              (uri) => {
                resolve(uri);
              },
              "base64"
            );
          });
     }
  
 }
  