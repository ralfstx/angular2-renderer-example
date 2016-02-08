# Custom Renderer for Angular2

**This is an experiment**, done to understand how custom renderers would work in Angular2.

The idea is to run a minimal Angular2 example application on Node.js using a custom render. The renderer is currently just a dummy that should log to the console.

Prepare:

    npm install -g typescript
    npm install

Compile:

    tsc -p .

Run:

    node src/app/boot.js

## License

Some code was copied from https://github.com/NativeScript/nativescript-angular, published under [Apache License 2.0](https://github.com/NativeScript/nativescript-angular/blob/master/LICENSE).
