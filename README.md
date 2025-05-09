
# MultiTimerApp

A React Native app for creating, managing, and interacting with multiple customizable timers.

## Features

- Add timers with name, duration, and category
- Timers grouped by category with expandable views
- Start, pause, reset timers individually or in bulk
- Visual progress indication
- On-completion modal message
- History screen for completed timers
- Local storage persistence via AsyncStorage

## Screens

- **Home**: Manage all timers and perform actions
- **History**: View log of completed timers

## Setup Instructions

1. Clone the repository or extract the ZIP.
2. Run `npm install` or `yarn install` to install dependencies.
3. Run the app using:
   ```
   npx react-native run-android
   // or
   npx react-native run-ios
   ```
4. Ensure to install the required dependencies:
   - `@react-navigation/native`
   - `@react-navigation/native-stack`
   - `@react-native-async-storage/async-storage`
   - `react-native-uuid`

## Assumptions

- The user interacts with the app via physical buttons or touch.
- No backend is used; all data is stored locally.
- Timers are simple countdowns (not stopwatch-based).
- Halfway alerts and export features are yet to be added (optional enhancements).

## Future Enhancements

- Export history as JSON
- Add dark/light theme toggle
- Filter timers by category
- Add halfway and custom alerts
