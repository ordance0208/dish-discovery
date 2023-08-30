# Dish Discovery

Welcome to Dish Discovery! This is a MERN stack recipe-sharing web application with user authentication and CRUD operations.

🚀 **Key Features:**
- 🌐 **MERN Stack at its Core:** Leveraging the power of MongoDB for flexible and scalable data storage, Express.js for efficient backend development, React for dynamic and responsive frontends, and Node.js for seamless server-side execution.
- 🔐 **User Authentication:** A secure user authentication system is in place, ensuring that only authorized users can access and interact with the application's features.
- 📝 **CRUD Operations:** Enjoy the convenience of full CRUD functionality. Create new entries, retrieve existing data, update information, and remove entries as needed.
- 🖥️📱 **Responsive User Interface:** The application boasts a modern and intuitive UI, designed with responsiveness in mind to deliver a consistent experience across devices.

## How to Run the App

Follow these steps to run Dish Discovery locally:

1. **Clone the Repository:** Start by cloning this repository to your local machine using the following command: `git clone https://github.com/ordance0208/dish-discovery.git`
2. **Navigate to the Directory:** Move into the project directory: `cd dish-discovery`
3. **Install Dependencies:** Install both server-side and client-side dependencies using the following commands: `cd server && npm install` `cd ../client && npm install --legacy-peer-deps`
4. **Set Up Environment Variables:** **4.1** Create a `.env` file in the `server` directory and add necessary environment variables: `MONGO_ATLAS_URL` for MongoDB connection, `SERVER_PORT` for the port that the server will listen to and `TOKEN_SECRET` for JWT's secret.
**4.2** Create a .env file in the client directory and add necessary environment variables: `REACT_APP_REST_API_BASE_URL` for the domain and the port of the BE server.
5. **Run the Development Servers:** In separate terminal windows, run the development servers for the frontend and backend: `cd client && npm run start` `cd ../server && npm run dev`
6. **Access the App:** Open your web browser and navigate to `http://localhost:3000` to access the Disc Discovery application.

Feel free to explore the application and experiment with the code!
