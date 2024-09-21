
# CodeFury 7.0 - Natural Calamity Response Webpage

## Project Overview

This project is our submission for CodeFury 7.0, where the challenge was to develop a solution for providing critical response and information during natural calamities. Our web application enables users to share their location, search for nearby shelter locations, send SOS messages, and connect with the community during a disaster.

## Features Implemented

### 1. Location Sharing
- **Google Maps Integration:**
  - We integrated the Google Maps iframe to display the user's current location directly on the webpage.
  - The Google Maps API is used to fetch and display the user's precise location in real time.

### 2. Shelter Location Search
- **OpenStreetMap API Integration:**
  - The OpenStreetMap API was used to retrieve information about shelters and other critical locations near the user.
  - Users can search for nearby shelters based on their current location or manually enter a location to find shelters in other areas.

### 3. User Authentication and Data Storage
- **Firebase Integration:**
  - Firebase handles user authentication, ensuring secure access to the platform's features.
  - Shelter locations, user posts, and other critical data are stored in Firestore, Firebase's NoSQL cloud database.

### 4. Community Posts
- **Dedicated Page for Community Sharing:**
  - A dedicated page allows users to post updates, share pictures, and connect with others during a disaster.
  - This feature facilitates real-time community engagement, enabling users to share vital information and support each other.

### 5. Donations and SOS Messages
- **Support and Emergency Communication:**
  - We have implemented a donation feature, allowing users to contribute to relief efforts.
  - Users can also send SOS messages to request immediate help during emergencies.

## How It Works

1. **Location Detection:**
   - The application detects the user's current location using the Google Maps API and displays it on the embedded map.

2. **Shelter Search:**
   - Users can find nearby shelters by either using their current location or entering a specific place name.
   - The OpenStreetMap API retrieves and displays relevant shelter information.

3. **User Authentication:**
   - Users can sign up and log in through Firebase Authentication, which securely manages their credentials.
   - Authenticated users gain access to additional features like saving locations and posting in the community section.

4. **Community Engagement:**
   - The dedicated community page enables users to share posts, upload pictures, and interact with other users, fostering support during critical times.

5. **Donations and SOS Messages:**
   - The platform allows users to donate to ongoing relief efforts and send SOS messages to signal for urgent help.

## Future Enhancements
- Implementing disaster alerts and notifications.
- Expanding the database of shelters and critical locations.
- Enhancing community engagement features with comments and likes on posts.

## Technologies Used
- **Google Maps API:** For location detection and map embedding.
- **OpenStreetMap API:** For retrieving shelter locations and other place information.
- **Firebase:** For user authentication, data storage, and SOS message handling.

## Team
- Arya Pai  
- Mythili Shetty  
- Cholaraju Aditya  
- Sunil Hegde
