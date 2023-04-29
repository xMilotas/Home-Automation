# Home-Automation Project

Simple Node.JS webserver with API routes to enable power plug control via webapp. 

This API used by my automation workflows and [Porcupine](https://github.com/xMilotas/Porcupine).

Also hosts a virtual fireplace which was inspired by a smart mirror. We usually have this running on the TV when we have friends over. Makes for a nice cosy atmosphere. 

![image](https://user-images.githubusercontent.com/25322643/129613847-078c4a93-aa9b-410a-b5d8-a39ee735c6f2.png)

Shows the current spotify song, time and weather. 

## WhatsApp Messages
Supports sending out WhatsApp messages via the `whatsapp-web.js` framework. 

- Make sure to install the chromium browser manually as puppeteer (which the framework uses under the hood) won't work otherwise. `sudo apt install chromium-browser chromium-codecs-ffmpeg` 
- Then point the executable path to the install location