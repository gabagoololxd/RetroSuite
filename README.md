# retroSuite
![super agent](https://raw.githubusercontent.com/pacificLiving/OSnes/master/chromeApp/frontend/img/icon/snes_128.png)

Bringing retro gaming into the modern world with a suite of mobile and web apps.

## Installation

Requirements:
- OS X is needed for iOS development
- Xcode 7.3 or higher - [download here](https://developer.apple.com/xcode/download/)
- npm - [install here](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
- [Cairo](https://github.com/Automattic/node-canvas/wiki,  https://github.com/Automattic/node-canvas ) must be installed before following the steps below

__Step 1: Run 'npm install' from the root directory__
```
$ npm install
```
__Step 2: Run 'npm install' from the webApp directory__
```
$ cd webApp
$ npm install
```
## Running the CrowdEMU webApp
__Step 1: Navigate to the webapp/emulatorNode directory__
```
$ cd webApp/emulatorNode
```
__Step 2: Set environmental variable CROWDMU_ROM to the available ROM__
```
$ CROWDMU_ROM=./path/to/rom.gb
```
__Step 3: Run index.js__
```
$ node index.js
```
__Step 4: Navigate to clientServer and run server.js__
```
$ cd clientServer
$ node server.js
```
__Step 5: Navigate your web browser to 'localhost:3000'__

## Running the OSnes chromeApp
__Step 1: Open Chrome and navigate to Tools > Extensions__

__Step 2: Click 'Load unpacked extension...'__

__Step 3: Select and open the 'chromeApp' directory in your forked and cloned version of this repository__

__Steop 4: Click 'Launch'__


### Scrum Roles
 - Scrum Master: Colin Whitmarsh
 - Product Owner: Kyle Corbelli
 - Extreme Programmer: Joe Miller
 - Extreme Programmer: Frank Shieh
