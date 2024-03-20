---
title: Running the Project Locally
---

# Running the Project Locally

```bash
# 1. Clone the Repository
git clone https://github.com/gitshubham45/restaurant-api-zag.git

# 2. Install Dependencies
cd restaurant-api-zag
npm install

# 3. Set Up Environment Variables
# Ensure that you have the necessary environment variables set up.
# Create a `.env` file in the project root directory and add your secret keys or configuration values.


#  PORT - <port number of your choice>

#  MONGO_URI= mongodb+srv://<username>:<passsword>@<clusterName>.zdtax2o.mongodb.net/<collectionName>?authSource=admin&replicaSet=atlas-aorc75-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true

# JWT_SECRET= <any string of your choice>

# 4. Start the Development Server
npm start

# 5. Test the endpoints shared through POSTMAN collection

---
title: examples of postman endpoints
---

# sign up
{
    "name" : "Ram Kumar",
    "email" : "Ram@sam.com",
    "password" : "12345",
    "role" : "user" // role - [user, admin , owner]
}


# Log in

{
    "email" : "shubham@sam.com",
    "password" : "12345"
}




