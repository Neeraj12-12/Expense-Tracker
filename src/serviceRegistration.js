import {Workbox} from "workbox-window";

export default function swRegistration() {
  console.log("in sw");
  // if (process.env.NODE_ENV !== "production") {
  //   return;
  // }
  console.log("in sw2");
  if (ServiceWorker in navigator) {
    console.log("in sw3");
    const wb = new Workbox("/sw.js");
    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        if (prompt("New Update Available. Click OK to update.")) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
}
