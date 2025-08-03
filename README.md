# Eventify ✨

**Create, manage, and experience events like never before. Eventify is a modern, real-time event management application that streamlines everything from creation to guest interaction.**

---

![Eventify Banner](https://placehold.co/1200x400/6366F1/FFFFFF?text=Eventify&font=inter)

## 🚀 Overview

Eventify is a full-featured web application designed to make event planning seamless and interactive. Users can create highly customized events, manage guest lists effortlessly, and send beautiful invitations directly via email. What makes Eventify special is its real-time interactivity: guest responses dynamically update the event status, and a built-in chat allows all participants to connect and discuss the event in one place.

## ⭐ Key Features

* **🎨 Custom Event Creation**: Design unique event pages with custom titles, descriptions, dates, times, and banner images.
* **📧 Email Invitations**: Add guests by email and send out invitations with a single click. Guests receive a unique link to view the event and respond.
* **🔄 Dynamic RSVP Tracking**: Watch as the guest list updates in real-time when invitees accept or decline.
* **💬 Real-Time Event Chat**: A dedicated chat room for each event allows the host and confirmed guests to communicate, share excitement, and coordinate details.
* **🔍 Smart Search & Filtering**: Easily find specific events using the search bar or filter your events by timeline (upcoming, past, etc.).
* **🔐 Secure Authentication**: User accounts are securely managed, ensuring that only authorized users can create and manage events.
* **📱 Responsive Design**: A clean, modern, and fully responsive UI that looks great on any device, from desktops to mobile phones.

## 📸 Screenshots

| LandingPage                                                                      | Dashboard                                                              |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| ![Landing](https://github.com/PraveenKumar-Katta/Event-Management-App/blob/main/src/assets/landingpage.png)    | ![Dashboard](https://github.com/PraveenKumar-Katta/Event-Management-App/blob/main/src/assets/events.png) |
| **Event-Detail**| **Real-Time Chat** |
| ![Event Details](https://github.com/PraveenKumar-Katta/Event-Management-App/blob/main/src/assets/eventdetails.png) | ![Event Deatails](https://github.com/PraveenKumar-Katta/Event-Management-App/blob/main/src/assets/chat.png)

## 🔥 Live link

[Live link](https://eventifybypk.netlify.app/)

```
## 📂 Project Structure

The project is organized with a clear and scalable folder structure to separate concerns and make development and maintenance straightforward.

src/
│
├── assets/             # Static assets like images, logos, and banners
├── components/         # Reusable UI components (e.g., Button, Input, Modal)
├── features/           # Redux Toolkit slices for state management (e.g., eventSlice, authSlice)
├── pages/              # Main application views (e.g., CreateEvent, MyEvents, EventDetail)
├── utils/              # Utility functions, Firebase configuration, and helper scripts
└── App.jsx             # The root component that handles routing and global layout

```
## 🛠️ Tech Stack

Eventify is built with a modern and powerful technology stack to ensure a robust and real-time user experience.

* **Frontend**: **React.js**
* **State Management**: **Redux Toolkit**
* **Backend & Database**: **Firebase** (Firestore for database, Firebase Authentication for users)
* **Styling**: **Tailwind CSS** (or your preferred styling library)
* **Routing**: **React Router DOM**

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or later)
* npm or yarn
* A Firebase project set up with Firestore and Authentication enabled.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/eventify.git](https://github.com/your-username/eventify.git)
    cd eventify
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```
    or if you use yarn:
    ```sh
    yarn install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```

The application should now be running on `http://localhost:5173` (or `http://localhost:3000` for Create React App).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
---

Made with ❤️ by Praveen Kumar(https://github.com/PraveenKumar-Katta)
