# Gigglify RN

A jokes app that makes you giggle, built using `React Native` [link](https://reactnative.dev)

- Tap the screen to get another joke.
- Tap on the Settings icon to change your preferred joke categories
- Tap on the Share icon to share a joke as text to other apps.
- Tap on the History button to view a list of past jokes, tap on any to share!
- Ready for internationalization (although only english resources are available at the moment)

![Screenshot_20241106_112049.png](screenshots/Screenshot_-_iPhone_1_Pro_-_2025-01-14_at_17.13.22.png)

## Key features

- Changing preferred joke categories
- Joke sharing (as text)
- View Joke History

## Technolgies & Libraries Used

- `Axios` [link](https://www.npmjs.com/package/axios) - to make network requests to the Jokes
  API [link](https://jokeapi.dev)
- `Realm DB` [link](https://www.mongodb.com/docs/atlas/device-sdks/sdk/react-native/) - mobile database that runs
  directly inside phones, tablets or wearables - used for persisiting past jokes
- `i18next` [link](https://www.npmjs.com/package/i18next) - a popular internationalization frameworkfor text
  localization
- `dayjs` [link](https://www.npmjs.com/package/dayjs) - a date manipulation library
- `Async Storage` [link](https://www.npmjs.com/package/@react-native-async-storage/async-storage) - used to store joke
  category preferences
- `Gorhom Bottom Sheet` [link](https://www.npmjs.com/package/@gorhom/bottom-sheet) - a nice bottom sheet library for the
  Settings and History components.
- Full list of packages used can be found in `packages.json` in the project root

## Screenshots

### Splash Screen

![Splash Screen](screenshots/Screenshot_-_iPhone_16_Pro_-_2025-01-14_at_17.11.27.png)

### Joke Categories

![Screenshot_20241106_112049.png](screenshots/Screenshot_-_iPhone_16_Pro_-_2025-01-14_at_17.13.46.png)

### History

![Screenshot_20241106_112049.png](screenshots/Screenshot_-_iPhone_16_Pro_-_2025-01-14_at_17.13.38.png)

# Environment Setup (Original README)

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [
`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

> **Note**: Make sure you have completed
> the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a
> new
> application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the
following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_
shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>
   Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out
  the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out
  the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your
  environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for
  React Native.
