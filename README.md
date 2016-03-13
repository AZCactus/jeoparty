# J E O P A R T Y
![Jeoparty logo](https://raw.githubusercontent.com/keithpops/jeoparty/master/app/images/jeoparty.jpg)
Hardware + React = Party Time!

## What's a Jeoparty?
Got a spare 25 minutes to burn? Watch [this](https://www.youtube.com/watch?v=GnIrNYtmRDg) from [React Conf](http://conf.reactjs.com/) 2016.

**Sorry, I got like 30 seconds.**

No problem!

*Jeoparty* is a proof-of-concept, arcade-version of the game show Jeopardy. It is meant to be played with physical buttons, voice control, a screen (preferably one with touch capabilities), and a physical method for selecting questions on a game board. Its UI is lovingly constructed using [react.js](https://facebook.github.io/react/) and the physical interactions are managed with the wonderful [Johnny-Five](http://johnny-five.io/) library from [Bocoup](https://bocoup.com/). The game was initially constructed to run on a [Raspberry Pi](https://www.raspberrypi.org/) with [Chromium](https://www.chromium.org/) connected to an [Arduino](https://www.arduino.cc/) but with some small modifications, it should be capable of running on nearly any hardware configuration you prefer.


### How to use it:

*DEVELOPMENT*

Start webpack in one terminal window for *hot changes*.
```
npm run dev-server-client
```
Start the server (with your Arduino / etc plugged in) in another terminal window.
```
npm run dev-server
```
See changes at [https://127.0.0.1:8080](https://127.0.0.1:8080)

---

*PRODUCTION*

Build production bundle both client and server.
```
npm run build
```

Run production client/server React/Express website.

```
npm run start
```

See it at [https://127.0.0.1:3000](https://127.0.0.1:3000)


### Todo:
- [ ] - Write some articles about how any of this stuff works per request of this [issue](https://github.com/keithpops/jeoparty/issues/1).
- [ ] - Either remove `react-router` or do something useful with it.
- [ ] - Remove `web-react` tech debt - Since I started with [web-react](https://github.com/darul75/web-react) as a boilerplate, there's a considerable amount of things that can get stripped out. `web-react` was awesome to just get a node app up and running with something on a page, but it did bring along dependencies that are likely a little excessive and no longer necessary for the game to function.
- [ ] - Fix `eslint` errors (and there's tons!)
- [ ] - Create a branch leveraging [react-hardware](https://github.com/iamdustan/react-hardware) just for fun.
- [ ] - Fix up the hack-ish SSL Chromium microphone permission stuff.
- [ ] - Clean up and abstract some of the various timers.
- [ ] - Create a parts list (with some options).
- [ ] - Create a tool list.
- [ ] - Buy cat food.


### Structure:
```
.
├── /build/                     # Compiled output
├── /conf/                      # Webpack scripts + testing glue.
├── /dist/                      # Production compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /app/                       # Source code of the client application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /components/            # React components
|       |── /__tests__/         # React components unit tests
│   ├── /stores/                # Stores contain the application state and logic
├── /server/                    # The source code of the server application
│   ├── /api/                   # REST API
│   ├── /routes/                # Express routes entries
│   ├── /server/                # Server-side startup script
│   ├── /utils/                 # Some specific, rendering...
├── /assets/                    # Static resources
│   ├── index.html              # Html templates used for `dev client` / `dev server` / `production`
│   ├── config                  # JSON configuration file, used for <head> metas today, more later...
└── package.json                # The list of 3rd party libraries and utilities
```

### Credits
- Logo by [Bobby Griffiths / Guttermagic](http://www.guttermagic.net/)
- Interactive Design by [Klarika Huszar](https://www.instagram.com/booghosty/)
- Started With [web-react](https://github.com/darul75/web-react)


### License

The MIT License (MIT)

Copyright (c) 2016 Keith Poplawski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
