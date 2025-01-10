## Video demonstration
https://github.com/user-attachments/assets/48695e40-d8a4-4a82-a55a-2421d32b11cd

**Note:** This code and documentation assumes some experience with TypeScript and React.

## Requirements

- Node.js `v20.10.0`
- npm `v10`


## Quick start

```bash
npm install
```

## Setup instructions

### Step 1: Start the local development server

To start the boilerplate's development server, run the following command:

```bash
npm start
```

The server becomes available at <http://localhost:8080>.

The app's source code is in the `src/app.tsx` file.

### Step 2: Preview the app

The local development server only exposes a JavaScript bundle, so you can't preview an app by visiting <http://localhost:8080>. You can only preview an app via the Canva editor.

To preview an app:

1. Create an app via the [Developer Portal](https://www.canva.com/developers/apps).
2. Select **App source > Development URL**.
3. In the **Development URL** field, enter the URL of the development server.
4. Click **Preview**. This opens the Canva editor (and the app) in a new tab.
5. Click **Open**. (This screen only appears when using an app for the first time.)

The app will appear in the side panel.

## Project introduction
This project uses react to implement image upload, image horizontal flip, image vertical flip, transparency adjustment and image export.

## Approach explanation
1. Use `<FileInput/>` component to upload images.
2. Use `canvas` to draw images and flip them horizontally and vertically.
3. Use `<Slider/>` component to adjust the range of the transparency.
3. Use `addElementAtPoint` API to add the images to the design.
4. Use `requestExport` API to export the design.
5. Use components such as `Rows, Columns, Buttons`, etc. for layout.





