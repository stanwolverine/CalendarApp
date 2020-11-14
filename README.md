# CalendarApp
React Native Calendar App 

## App Features
1. User can see all the "dates with events" in a month. (note: busy dates are marked with red color and free dates are marked with blue color)
2. It can change month by clicking on arrows or swiping and see "dates with events" for the month.
3. It can view all its events at a particular date by selecting date.
4. It can add calendar events to selected date by clicking on "plus" button. (note: title is a required field for adding event)
5. User will be notified before 10 mins of event start time.
6. It can delete any event by swiping left an event and clicking on delete icon.

## Missing Important Features
1. Jump to any date.
2. Editing events.
3. More fields for adding calendar event.
4. Visual effect for current selected date.

## Changes to make in /android folder to build this app
1.) In `/android/app/build.gradle`

  paste below code after this line: `apply from: "../../node_modules/react-native/react.gradle"`
  ``` 
  project.ext.vectoricons = [
      iconFontNames: [ 'MaterialCommunityIcons.ttf', 'Ionicons.ttf', 'MaterialIcons.ttf' ] // Name of the font files you want to copy
  ]

  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
  ```

2.) In `/android/app/src/main/java/com/<appname>/MainActivity.java`

* paste below code after this line: `import com.facebook.react.ReactActivity;`
  ```
  import com.facebook.react.ReactActivityDelegate;
  import com.facebook.react.ReactRootView;
  import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
  ```

* paste below code in MainActivity class
  ```
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
  ```
