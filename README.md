# Mobile-Client

This is the mobile app for Alliance Hire in React Native.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them   
1. Install node [Node Version Manager](https://github.com/creationix/nvm) is a good method.
2. Install [yarn](https://yarnpkg.com/en/docs/install).
3. Run `yarn` in the project directory
4. Install the appropriate simulator:
..a. iOS - Install Xcode, the easiest way is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
..b. Expo recommends the Genymotion emulator over the Android Studio emulator, refer here [Genymotion](https://docs.expo.io/versions/latest/guides/genymotion.html).

> Note: should install XCode before install yarn 
- brew install yarn
- yarn install: Install all the dependencies listed within package.json in the local node_modules folder. use `yarn install --force` to refetches all packages, even ones that were previously installed.

> Note: make sure you use `yarn` and not `npm`. React native currently isn't compatible with NPM version 5 which is the latest release, Yarn provides those core features that we need for now, such as; automatic shrinkwrap and dependency consistency.

#### `yarn start`

Runs your app in development mode.

#### `yarn ios`

Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

## Deployment

In order to deploy the app you need to have the [expo cli](https://docs.expo.io/versions/latest/guides/exp-cli.html) installed:   
 - So run `npm install -g exp`

In order to deploy the application you will need to create the two binaries to be submitted to the appropriate app stores.

### iOS Deployment
1. Start the build by running `yarn build:ios`
  - This will start a build of the application in the cloud, it can take a while to complete (~15 minutes) so you will need to check on the build manually by running `yarn build:status`
2. Once the build has complete the builds status should provide you with a url to an IPA file, you will need to open this in your browser and download the file.
3. Once the file has been downloaded you will then need to upload it to itunes connect. Open XCode and go to `XCode > Open developer tools > Application loader`.
4. Sign into your itunes connect account and then find the IPA file from your downloads and upload it.
5. Follow the prompts.
6. Once the IPA has finished uploading you will need to login to itunes connect in your browser and navigate to `My Apps > Alliance Hire > Activity > All Builds`, here you should find a new app version which has (processing) next to a number. You will need to wait for this to complete (can take 30 minutes - two hours in my experience).
7. Once it has completed you can navigate to TestFlight where you will find your new version but with a warning sign next to it. You will need to click the warning and follow the prompts. Once you have completed this, you will be able to test your app in FlightTest. 
8. Make sure to update the version number in `app.json` from the projects home directory, otherwise you will need to repeat steps 1 - 5 as you cannot submit an app with the same version of a previous app to the apple store.   
   
The process of deploying the app as an official app hasn't been completed yet.

### Android Deployment
1. Start the build by running `yarn build:android`
  - This will start a build of the application in the cloud, it can take a while to complete (~15 minutes) so you will need to check on the build manually by running `yarn build:status`
2. Once the build has complete the builds status should provide you with a url to an APK file, you will need to open this in your browser and download the file.
3. Connect to your device with `adb connect` - I use my phone for this (over usb debug) and haven't used an emulator, look at expos documentation if you want to emulate a device instead.
4. Install the APK onto the phone `adb install <path to apk>.apk`
   
The process of deploying the app as an official app hasn't been completed yet.

## Built With

Main libraries used in this project:

* [Node](https://nodejs.org/en/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Expo](https://expo.io/) - a free and open source toolchain built around React Native.
* [React Native](http://facebook.github.io/react-native/) - a native mobile app framework powered by Facebook's React project.
* [Redux](https://redux.js.org/) - a predictable state container for JavaScript apps.
* [NativeBase](https://nativebase.io/) - a cross-platform UI component library for React Native.   

Refer to the `package.json` for full credit.

> Note: The project currently depends on a custom fork of `react-native-dates` under [DaneW](https://github.com/DaneW)'s GitHub, if you need to update this repository, you will need to fork it yourself.
