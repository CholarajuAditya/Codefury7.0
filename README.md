# CodeFury 7.0 - Natural Calamity Response Webpage

## Project Overview

This project is our submission for CodeFury 7.0. The challenge was to create a solution for providing critical response and information during natural calamities. Our web application focuses on enabling users to share their location, search for nearby shelter locations, and share updates with the community in the event of a disaster.

## Features Implemented

### 1. Location Sharing
- **Google Maps Integration:**
  - We used the Google Maps iframe to display the user's current location on the webpage.
  - The Google Maps API was utilized to fetch and display the user's precise location.

### 2. Searching Shelter Locations
- **OpenStreetMap API Integration:**
  - We leveraged the OpenStreetMap API to fetch information about shelters and other critical locations near the user.
  - Users can search for nearby shelters based on their current location or manually enter a location to find shelters in a different area.

### 3. User Authentication and Data Storage
- **Firebase Integration:**
  - Firebase is used for user authentication, ensuring secure access to the platform's features.
  - Shelter locations and other critical information are stored in Firestore, Firebase's NoSQL cloud database.

### 4. Community Posts
- **Dedicated Page for Community Sharing:**
  - We have implemented a page where users can post updates, share pictures, and connect with others during a disaster.
  - This feature allows for real-time community engagement, making it easier to share vital information and support each other.

## How It Works

1. **Location Detection:**
   - The application detects the user's current location using the Google Maps API.
   - The detected location is then displayed on the map embedded through the Google Maps iframe.

2. **Shelter Search:**
   - Users can choose to find nearby shelters based on their current location or by entering a specific place name.
   - The OpenStreetMap API is used to retrieve and display information about nearby shelters.

3. **User Authentication:**
   - Users can sign up and log in through Firebase Authentication, which securely manages user credentials.
   - Once authenticated, users can access additional features like saving locations and posting in the community section.

4. **Community Engagement:**
   - The dedicated community page allows users to share posts, upload pictures, and interact with other users.
   - This feature helps in spreading awareness and providing support during critical times.

## Future Enhancements
- We plan to integrate real-time updates on shelter availability.
- Implementation of disaster alerts and notifications.
- Expanding the database of shelters and critical locations.
- Enhanced features for community engagement, including comments and likes on posts.

## Technologies Used
- **Google Maps API:** For location detection and map embedding.
- **OpenStreetMap API:** For retrieving shelter locations and other place information.
- **Firebase:** For user authentication and storing shelter locations and community posts.

## Team
- Arya Pai  
- Mythili Shetty
- Cholaraju Aditya
- Sunil Hegde

