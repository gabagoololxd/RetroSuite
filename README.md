<a target="_blank" href="https://chrome.google.com/webstore/detail/retrosuite-emu/bnjapfbdmfjehbgohiebcnmombalmbfd">![Try it now in CWS](https://raw.github.com/GoogleChrome/chrome-app-samples/master/tryitnowbutton.png "Click here to install this sample from the Chrome Web Store")</a>

# RetroSuite
A platform to bring retro-gaming to the modern era.

__CrowdEMU (Web App):__ 
Website where thousands of people can share an instance of a game; every 3 seconds the most popular move is executed. Includes video streaming. https://www.crowdemu.com

__RetroSuite EMU (Chrome App):__ 
Native desktop application. Play your favorite NES, SNES, Gameboy and Gameboy Advance ROMs; use your phone as your controller - or use custom keyboard mappings. Deploys a websockets tcp server to allow use of phone as a controller. 
- Use your iPhone as your joypad
- Use your own custom keyboard button mappings; right click the screen once a game has started to pause and re-map
- Try out some pre-loaded games, or add your own; RetroSuite EMU will remember the ones you've added
- RetroSuite EMU auto-saves your game as you play, but you can also manually save and load in save states

__RetroSuite Controller (Mobile App):__ 
React Native phone app that pairs with the Chrome app and acts as a controller for the retro console.

## Scrum Roles
 - Scrum Master: Colin Whitmarsh
 - Product Owner: Kyle Corbelli
 - Extreme Programmer: Joe Miller VI
 - Extreme Programmer: Franklin Shieh

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
### Running the CrowdEMU Web App
 __Step 1: Navigate to the webapp/emulatorNode directory__
 ```
 $ cd webApp/emulatorNode
 ```
 __Step 2: Set environmental variable CROWDMU_ROM to the available ROM. This emulator is compatible with Gameboy Color ROMS__
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

### Running the RetroSuite EMU Chrome App
 __Step 1: Open Chrome and navigate to Tools > Extensions__

 __Step 2: Click 'Load unpacked extension...'__

 __Step 3: Select and open the 'chromeApp' directory in your forked and cloned version of this repository__

 __Step 4: Click 'Launch'__

## Credits and Thanks
 - Thanks to Matthew Justin Bauer for providing open source access to his Chrome App emulator https://github.com/matthewbauer/gametime-player
 - Thanks to Guillermo Rauch for providing open source access to his weplay repository https://github.com/rauchg/weplay
