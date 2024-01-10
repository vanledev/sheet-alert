import fetch from "node-fetch";
import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import { JWT } from "google-auth-library";
import json from "./jwt.keys.json" assert { type: "json" };
const { client_email, private_key, project_id } = json;

const SPREADSHEET_ID = "1LSqPE5n5A1FFISaVqgtB3rgm2YbaxWJIXuX0miRUB3s";

const jwtClient = new JWT({
  email: client_email,
  key: private_key,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/calendar",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth: jwtClient,
});
const drive = google.drive({
  version: "v3",
  auth: jwtClient,
});

const fileWatch = async function fileWatch() {
  const res = await drive.files.watch({
    fileId: "1-V4WFLUZqy3VQaBOerMsT_EtVnNFxcqGLI3fm069gOc",
    requestBody: {
      id: "01234567-89ab-cdef-012345678911abcde", // Your channel ID.
      type: "web_hook",
      address: "https://en1nxxubnptfj.x.pipedream.net/", // Your receiving URL.
      payload: true,
    },
  });
  // const json = await res.json();
  console.log(res);
};
 
