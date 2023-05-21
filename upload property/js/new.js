const firebaseConfig = {
    apiKey: "AIzaSyBPSVGHHk1av5PjAeGsXosmkj4-JJADAvU",
    authDomain: "property-listing-dypcet.firebaseapp.com",
    databaseURL: "https://property-listing-dypcet-default-rtdb.firebaseio.com",
    projectId: "property-listing-dypcet",
    storageBucket: "property-listing-dypcet.appspot.com",
    messagingSenderId: "274004945809",
    appId: "1:274004945809:web:0f2e5496edaccd534a0830",
    measurementId: "G-YKFR1KGRS5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore reference
var db = firebase.firestore();

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
var textdetails;

var imgurl;
var txturl;

var pname = document.querySelector(".prop");
var pprice = document.querySelector(".price");
var pcontact = document.querySelector(".contactinfo");
var address = document.querySelector(".address");





function uploadToFirestore() {
    // Get the value from the text input
    var pname = document.querySelector("#prop");
    var pprice = document.querySelector("#price");
    var pcontact = document.querySelector("#contactinfo");
    var paddress = document.querySelector("#address");
    var inp1Val = pname.value;
    var inp2Val = pprice.value;
    var inp3Val = pcontact.value;
    var inp4Val = paddress.value;

    var data = {
        name: inp1Val,
        price: inp2Val,
        contact: inp3Val,
        address: inp4Val
      };
  
    var collectionRef = db.collection("propertyinfo");
  
    // Upload the value to Firestore
    collectionRef.add(data)
    .then(function(docRef) {
      console.log("Data uploaded to Firestore with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error uploading data to Firestore: ", error);
    });
}
  





function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;

}


function uploadImage(){

    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
    },(error)=>{
        console.log("Error is ", error);
        
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);

            if(url != ""){
                img.setAttribute("src",url);
                img.style.display="block";

            }
        })

    })

}

































// var jsonData = JSON.stringify(textdetails);
// var blob = new Blob([jsonData], { type: 'application/json' });

// var textContent = textdetails.join("\n");
// var blob = new Blob([textContent], { type: "text/plain" });








// function uploadText(){
//     let storageRef = firebase.storage().ref("details/"+ blob);
//     let upload = storageRef.put(blob);
    
//     upload.on("state_changed", (snapshot)=>{
//         console.log(snapshot);
//     },(error)=>{
//         console.log(error);
//     },()=>{
//         upload.snapshot.ref.getDownloadURL().then((txturl)=>{
//             console.log("TxtURL: ", txturl);
//         })
//     })
    
// }