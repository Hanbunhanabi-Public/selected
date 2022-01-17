# React Native Mobile Application

## Environment settings

[comment]: <> (- [Andriod Studio Windows]&#40;#run-on-andriod-studio-windows-version&#41;)

[comment]: <> (- [Andriod Studio MacOS]&#40;#run-on-andriod-studio-macos-version&#41;)

[comment]: <> (- [Xcode]&#40;#run-on-xcode&#41;)

Resources: [native-react](https://facebook.github.io/react-native/docs/getting-started)

### Run on Andriod Studio (Windows version)

#### Required Packages

##### Install Via Links
- [node.js](https://nodejs.org/en/), choose LTS version
- [python 2](https://www.anaconda.com/distribution/), official requirement is python 2 but python 3 should be fine as well
- [java JDK](https://jdk.java.net/java-se-ri/12), any version from JDK 8 to JDK 12 is fine, ***JDK 13 is not supported***
    
##### Install Via Terminal 
- Install package manager choco:
  - Open powershell with Admin and enter 
        
        Get-ExecutionPolicy

  - If it returns Restricted, then run 
        
        Set-ExecutionPolicy AllSigned

    or 

        Set-ExecutionPolicy Bypass -Scope Process

  - Then run 
  
        Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

- Install required packages:
        
        choco install -y nodejs.install python2 jdk8
        
#### Start to set up 
- [Android Studio](https://developer.android.com/studio)
    - Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:
      - Android SDK
      - Android SDK Platform
      - Performance (Intel ® HAXM) (See here for AMD)
      - Android Virtual Device
    - After install Android Studio click on Configuration: 
      - In SDK manager: 
        - Select "SDK Platforms" and click the  "Show Package Details"
          - Choose Android version 9 (Android SDK Platform 28)
          - Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
        - Select the "SDK Tools" and click on "Show Package Details"
          - Find "Android SDK Build-Tools" to make sure 28.0.3 is installed 
      - In AVD manager:
        - Create a device with Android 9
  - For A2
    - In `SDK manager` -> in `SDK tools` install: 
      - CMake 
      - NDK (side by side)
    - Once NDK is installed: 
      - Go to `C:\Users\you-username\AppData\Local\Android\Sdk\ndk\23.0.7123448\toolchains`
      - Download the [NDK package](https://developer.android.com/ndk/downloads/)
      - Copy the `arm-xxxx` and the `x86_xxxx` files in the downloaded package into the toolchain directory above.
        - In other words, copy everything except `llvm` and `renderscript`
- [WebStorm](https://www.jetbrains.com/webstorm/) 
- Setting up node.js global install folders :
  - Create folders called node_cache, node_global node_global/node_modules 
- Setting up Environment: in Control penal -> System and Security -> Change setting -> Advance -> Environment Variables
  - In System environment edit, if you don't have then create one:
    - JAVA_HOME which points to your JDK
        
        To confim, run commands in powershell: 

            java --version
            javec --version

    - ANDROID_HOME
      - If already exists, move or add this to the path:

                        c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools

      - If you don't have ANDROID_HOME then create one and add this to the path:

                        c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
                
    - Create a NODE_PATH: add the folder we just created node\_global/node\_modules to it 

        - Add python environment to PATH. This includes three paths into your PATH, they usually locate at:
                           
            c:\Users\YOUR_USERNAME\Anaconda\Lib
            c:\Users\YOUR_USERNAME\Anaconda
            c:\Users\YOUR_USERNAME\Anaconda\Scripts 
            c:\Users\YOUR_USERNAME\Anaconda\libs
            c:\Users\YOUR_USERNAME\Anaconda\Library\bin
                    
        To confim, run command in powershell: 

            python 

    - In user environment, add folder node_global to PATH 
- Setting up native-react
  - Setting up the global install path if you install folders globally:

        npm config set prefix "{your path}\node_gobal"
        npm config set cache "{your path}\node_cache"

  - Install in powershell:
                
        npm install -g react-native-cli 
                
- Enter Tripmate/mobile folder and run:
        
        npm install

- Now open your webstorm and create a native-react application. It should set up automatically, run it to see the result. Webstorm will automatic start up the native-react, otherwise you need start it up on your own.
- For android studio, add open the project and add android as root into android studio. Before you start in Android stuido run this in powershell:
            
        cd Tripmate/mobile
        npm native-react start

- For running on powershell:
        
        cd Tripmate/mobile   
        npx react-native run-android
      
     

- Remark: to solve some ulgy issus try:
                
        cd Tripmate/mobile/android
        ./gradlew clean
        ./gradlew test
                
***WARNING***: DO NOT PUT PROJECT IN ONEDRIVE OR OTHER WEB NETDRIVE FOLDER, PROJECT WILL CRASH  

### Run on Andriod Studio (MacOS version)

#### Required Packages
- Node 8.3+
  - Install Homebrew

        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  - Then install node using Homebrew

        brew install node

- JDK (8 or newer)

        brew tap AdoptOpenJDK/openjdk
        brew cask install adoptopenjdk8

#### Start to set up
- Install [Andriod Studio](https://developer.android.com/studio/index.html)
   - When prompted to select an installation type. Make sure the boxes next to all of the following are checked: 
      - Android SDK
      - Android SDK Platform
      - Performance (Intel ® HAXM)
      - Android Virtual Device
    - After install Android Studio click on Configuration: 
      - In SDK manager: 
        - Select "SDK Platforms" and click the  "Show Package Details". Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:
          - Android SDK Platform 28
          - Intel x86 Atom_64 System Image
        - Select the "SDK Tools" and click on "Show Package Details"
          - Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected.
        - Finally, click "Apply" to download and install the Android SDK and related build tools.
      - In AVD manager:
        - Pick any Phone from the list and click "Next", then select the Pie API Level 28 image
- Configure the ANDROID_HOME and JAVA_HOME environment variable. Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:

        export JAVA_HOME=$(/usr/libexec/java_home)
        export ANDROID_HOME=$HOME/Library/Android/sdk
        export PATH=$PATH:$ANDROID_HOME/emulator
        export PATH=$PATH:$ANDROID_HOME/tools
        export PATH=$PATH:$ANDROID_HOME/tools/bin
        export PATH=$PATH:$ANDROID_HOME/platform-tools

    Type `source $HOME/.bash_profile` to load the config into your current shell. 
    
    Verify that ANDROID_HOME has been added to your path by running `echo $PATH` . Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.
- And then To start the simulator, go to Tripmate git repository, under mobile, run 
    
        npx react-native run-android

  If this is your first time setting up and running on the device. Please run `npm install` first. 

## ABD access

to start ABD:
  
    adb shell

the download folder:

    /storage/self/primary/Download

the command to download

    adb pull "/storage/self/primary/Download/<flieName>

    
