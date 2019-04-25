const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");

const gcconfig = {
  projectId: "rnplaces-ee771",
  keyFileName: "rnplaces-ee771-firebase-adminsdk-5y4zp-d394aae6ec.json"
};

const gcs = new Storage(gcconfig);

admin.initializeApp({
  credential: admin.credential.cert(require("./rnplaces-ee771-firebase-adminsdk-5y4zp-d394aae6ec.json"))
});


exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No token present");
      response.status(403).json({ error: "Unauthorized" });
    }

    let idToken = request.headers.authorization.split("Bearer ")[1];

    admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64");
        const bucket = gcs.bucket("rnplaces-ee771.appspot.com");
        const uuid = UUID();

        return bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid,
                imagePath: "/places/" + uuid + ".jpg"
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(error => {
        console.log(error);
        response.status(403).json({ error: "Unauthorized" });
      });

  });
});

exports.deleteImage = functions.database
  .ref("/places/{placeId}")
  .onDelete(snapshot => {
  const placeData = snapshot.val();
  const imagePath = placeData.imagePath;
  const bucket = gcs.bucket("rnplaces-ee771.appspot.com");
  return bucket.file(imagePath).delete();

});
