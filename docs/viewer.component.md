# Alfresco Viewer component

See it live: [Viewer Quickstart](https://embed.plnkr.co/iTuG1lFIXfsP95l6bDW6/)

<!-- markdown-toc start - Don't edit this section.  npm run toc to generate it-->

<!-- toc -->

- [Basic usage](#basic-usage)
- [Properties](#properties)
- [Details](#details)
  * [Supported file formats](#supported-file-formats)
  * [PDF Conversion](#pdf-conversion)
  * [Configuring PDF.js library](#configuring-pdfjs-library)
  * [Custom extension handler](#custom-extension-handler)

<!-- tocstop -->

<!-- markdown-toc end -->

## Basic usage

Using with node id:

```html
<adf-viewer 
    [showViewer]="true" 
    [overlayMode]="true" 
    [fileNodeId]="'d367023a-7ebe-4f3a-a7d0-4f27c43f1045'">
</adf-viewer>
```

Using with file url:

```html
<adf-viewer 
    [overlayMode]="true" 
    [urlFile]="'filename.pdf'">
</adf-viewer>
```

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| fileNodeId | string | | Node Id of the file to load |
| urlFile | string | | If you want to load an external file that does not come from ECM you can use this Url where to load the file |
| urlBlob | Blob | | If you want to load a Blob File |
| overlayMode | boolean | false | If `true` show the Viewer full page over the present content otherwise will fit the parent div |
| showViewer | boolean | true | Hide or show the viewer |
| showToolbar | boolean | true | Hide or show the toolbars |
| displayName | string | | You can specify the name of the file |
| allowGoBack | boolean | true | Allow `back` navigation |
| allowOpenWith | boolean | false | Toggle `Open With` options |
| allowDownload | boolean | true | Toggle download feature |
| allowPrint | boolean | false | Toggle printing feature |
| allowShare | boolean | false | Toggle sharing feature |
| allowInfoDrawer | boolean |false | Toogle info drawer feature |
| showInfoDrawer | boolean | false | Toggles info drawer visibility. Requires `allowInfoDrawer` to be set to `true`. |
| allowMoreActions | boolean | false | Toggles `More actions` feature |

## Details

### Supported file formats

| Type | Extension |
| --- | --- |
| Media | wav, Mp3, Mp4, WebM, Ogv |
| Images | png, jpg, jpeg, gif, bmp |
| Text | pdf, txt |

### PDF Conversion

For unsupported extensions or mime types the viewer will try to fetch PDF rendition utilising the [renditions service api](https://community.alfresco.com/docs/DOC-5879-rendition-service)

### Configuring PDF.js library

In order to configure your webpack-enabled application with the PDF.js library please follow the next steps.

Install pdfjs-dist

```sh
npm install pdfjs-dist
```

Update `vendors.ts` by appending the following:

```ts
// PDF.js
require('pdfjs-dist/web/compatibility.js');
const pdfjsLib = require('pdfjs-dist');
pdfjsLib.PDFJS.workerSrc = './pdf.worker.js';
require('pdfjs-dist/web/pdf_viewer.js');
```

The code above enables the "viewer" component and "compatibility" mode for all the browsers.
It also configures the web worker for PDF.js library to render PDF files in the background.

Update the `plugins` section of the `webpack.common.js` file with the next lines:

```js
new CopyWebpackPlugin([
    ...
    {
        from: 'node_modules/pdfjs-dist/build/pdf.worker.js',
        to: 'pdf.worker.js'
    }
])
```

The Viewer component now should be able displaying PDF files.

### Custom extension handler

If you want to handle other file formats that are not yet supported by the ng2-alfresco-viewer you can define your own custom handler.

Below you can find an example with the use of `extension-viewer` if you can handle 3d files

```html
<adf-viewer 
    [(showViewer)]="fileShowed"
    [fileNodeId]="fileNodeId"
    [overlayMode]="true">
    
    <extension-viewer [supportedExtensions]="['obj','3ds']" #extension>
        <ng-template let-urlFileContent="urlFileContent" let-extension="extension">
            <threed-viewer 
                [urlFile]="urlFileContent" 
                [extension]="extension">
            </threed-viewer>
        </ng-template>
    </extension-viewer>

</adf-viewer> 
```

Note: you need adding `ng2-3d-editor` dependency to your `package.json` file to make the example above work.

It is possible to define multiple `extension-viewer` templates:

```html
<adf-viewer 
    [(showViewer)]="fileShowed"
    [fileNodeId]="fileNodeId"
    [overlayMode]="true">

    <extension-viewer [supportedExtensions]="['xls','xlsx']" #extension>
        <ng-template let-urlFileContent="urlFileContent"  >
            <my-custom-xls-component 
                urlFileContent="urlFileContent">
            </my-custom-xls-component>
        </ng-template>
    </extension-viewer>

    <extension-viewer [supportedExtensions]="['txt']" #extension>
        <ng-template  let-urlFileContent="urlFileContent" >               
            <my-custom-txt-component 
                urlFileContent="urlFileContent">
            </my-custom-txt-component>
        </ng-template>
    </extension-viewer>
</adf-viewer> 
```
