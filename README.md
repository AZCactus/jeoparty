## J E O P A R T Y

Arduino + Raspberry Pi + React = Party Time!


How to use it
-------------

*DEV ONLY CLIENT*

Webpack with hot changes loading but no own server, enough for a single presentation page app by instance. Port: 8080

See changes at [https://127.0.0.1:8080](https://127.0.0.1:8080)

```
npm run dev
```

*DEV ONLY CLIENT/SERVER*

Let's use your own NodeJS server.

Start webpack in background with *hot changes loading* and *debug* in both client/server sides.

```
npm run dev-server-client
```

*Then* start your node server which is an express one in this case that will be launched in ES6 thanks to Babel.

```
npm run dev-server
```

or with debug nodejs mode :

```
npm run dev-server-debug
```

See changes at [https://127.0.0.1:3000](https://127.0.0.1:3000)

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

STRUCTURE
-------------
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

## Credits
- Logo by [Robert Griffiths / Guttermagic](http://www.guttermagic.net/)
- Started With [web-react](https://github.com/darul75/web-react)

===========

## License

The MIT License (MIT)

Copyright (c) 2015 Julien Valéry

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
