# quest

## Development server

### Basic steps

These steps are common for frontend.

1. Make sure you have `node` version `^16` and `npm` version `^8` installed.

2. Install packages. In the project's root directory run:

   ```
      npm i
   ```

   3. Before pushing changes on git, run:
    ```
        npm run format
    ```
    &&

    ```
         npm run lint
    ```
   All files must be linted and formatted

### Frontend

1. Start angular app. Run in `./quest-python` directory:
   ```
    npm run  ng serve
   ```
   - Note: Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.