This README file provides an overview of the intended behavior of the NFT Collection Mobile App and guides through setting up and running the application.

# Intended Behavior of the Mobile App
 ## Features
   - Display NFT DeGod Collection
   - Display Particular NFT details.
   - Bookmark NFT.
   - Infinite scroll

## The app displays a list of NFT tokens with the following attributes:
  - Name: The name of the NFT token.
  - Owner Address: The address of the current owner of the NFT.
  - Image: An image associated with the NFT.
  
## Bookmarking NFTs
  - Users can bookmark their favorite NFTs.
  - Bookmarked NFTs are stored locally using local storage.
  - Users can view their bookmarked NFTs.
  - Users can remove NFTs from their bookmarks.

## App Layout

The app layout consists of a single screen with two tabs:
  - Home Tab: Displays all NFT tokens.
  - Bookmarked Tab: Displays the NFTs that the user has bookmarked.

## NFT Details Screen

 - Clicking on an NFT card in the list opens a detailed screen.
 - Users can bookmark or un-bookmark an NFT from the detail screen.

  
# Setup and Installation
### Prerequisites
   - Ensure you have Node.js installed on your machine.
    
  - Clone the Repository

  - Install the necessary dependencies using npm i 


 ## To start the app, use the following Expo commands:

   - npx expo start
     
  - You can run the app on an emulator or a physical device using the Expo Go app.
  - You can create the android build using   eas build --platform android --profile preview

Open the app and navigate to the "Home" tab to see the list of available NFTs.
Click on any NFT card to view its details.

On the NFT details screen, click the bookmark icon to add the NFT to your bookmarks.
Navigate to the "Bookmarked" tab to view your bookmarked NFTs.

On the NFT details screen, click the un-bookmark icon to remove the NFT from your bookmarks.
Alternatively, go to the "Bookmarked NFTs" tab and remove the bookmark from there.
Contributing.


# APK file for the Native app
  https://expo.dev/accounts/maitri-27/projects/NFTcollection/builds/9aebe212-6c85-4eae-a6ab-a7386a37922b


