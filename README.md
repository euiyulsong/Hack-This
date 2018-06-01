# Hack This
## Informatics 2018 Capstone Project

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Commercial: Not for Profit](https://img.shields.io/badge/commercial-Not%20for%20Profit-green.svg)](https://opensource.org/licenses/MIT)

Team Members:
- [Ryan Keller](https://github.com/RcKeller)
- [Ali Shubber](https://github.com/alishubber)
- [Muhammad Hussain](https://github.com/mnh78614)
- [Eui Yul Song](mailto:eysong@uw.edu)
<!-- Refer to our GitHub accounts for contact information, as they are subject to change -->

To facilitate everyday users and information professionals in developing a finer understanding of their online presence, we have developed Hack This - an automated web penetration testing tool for everyone.
Using our extension, users can run scripts designed to reveal how websites consume their information and the resultant vulnerabilities exposed by those practices. For the everyday user, we provide scripts that can be run automatically against webpages to reveal how they operate under the hood. For the information professional we provide a fully integrated development environment that facilitates the development of scripts with features such as code auto-completion, error correction, and saving.
The future of this project is extending the client-side functionality to the community level, allowing users to share, install, and review scripts online with a community-based system akin to an app store. Our current project is feature complete on the client-side, and features a unique script execution mechanism that allows users to perform operations without the limitations of an ordinary browser extension.

## Contents

```
dist/
extension/
website/
```

- `dist/` is the publicly distributed or "production ready" version of the application.
- `extension/` is the source code for the application.
- `website/` is a landing page that provides an overview of the product. [Live Demo](https://alishubber.github.io/capstone/)

## Quick Start

### Distribution App

This application must be manually installed via Chrome.
- Navigate to the following URL:
```http
chrome://extensions
```
- Enable *developer tools* using the toggle button at the top right
- Click "Load Unpacked" and select the `dist/` folder
- Finish loading and ensure the extension is enabled

We will not distribute *Hack This* via the Chrome Store until we have undergone a full legal review, due to the social ramifications of automated penetration testing.

### Chrome Extension

**REQUIRES FIREBASE CREDENTIALS**. These credentials must be stored in `extension/app/flux/` in a file named `firebase.js`. The scheme for how this file is structured can be seen in [firebase.js](extension/app/flux/firebase.example.js).
This is a security measure to ensure that developers do not accidentally compromise their API credentials. An example of the data structure used in the Firebase instance is available in [example.db.json](example.db.json).
```bash
# Navigate to the extension directory
cd extension
# Install dependencies
npm install
# Create a production build
npm run build
# Run a  development server
npm run dev
```

Builds are distribution-ready copies that can be loaded as an extension. The development server creates a temporary `dev/` folder with assets that can be loaded as an unpacked extension. This is a hot-reloading copy of the application, which is to say it rebuilds itself to incorporate changes immediately as they are made to the codebase.

See the [Quick Start guide](#quick-start) for instructions on how to install an unpacked extension.

### Website

[Hosted Online via GitHub Pages](https://alishubber.github.io/capstone/).

Because the website was developed as a static resource, you can open it directly from [index.html](website/index.html) with any web browser.

## System Details

Developing security tools for Google Chrome poses unique challenges due to the security measures integral to the product. The browser uses what are known as "sandboxes", which are JavaScript runtime environments that include a layer of protection on top. Sandboxes provide an extended API, but mostly exist as a means of securing the underlying environment and the means by which they are accessed.
The biggest challenge in developing a Chrome Extension for our use case (penetration testing) is bypassing these protections to run scripts in an organic environment, right next to the webpage. To do this, we have created a unique system for injecting scripts into the raw environment.

A brief technical overview of how we execute scripts:
- The user runs a script, which is parsed as a string.
- This string is wrapped in a "post message" function, delivering it to the underlying webpage as a payload.
- An event listener is added that expects this payload, which is evaluated by Chrome as a "safe" function.
- The listener receives the code as plaintext, parses it, then executes it as an asynchronous function.
- The output of the script is posted as another message, bubbling output up.
- This message is intercepted by the extension and output is returned to the user.

## Technical Stack

- **[Chrome Extension API](https://developer.chrome.com/extensions/devguide)** for the core application.
  - Chosen because of market permeation and how robust the API is.
- **[React](https://github.com/facebook/react)** for extension views.
  - Chosen because it is a design-centric framework, and user experience is essential for our value proposition.
- **[Redux](https://github.com/rackt/redux)** for state management.
  - Chosen because it is performant, scalable and affords robust debugging capabilities.
- **[Firebase](https://firebase.google.com/docs/)** for data storage.
  - Chosen because it has a flexible JSON-based structure and our data schema is subject to change as we scale and build community features.

# LICENSE

[MIT](LICENSE). Not for profit.
