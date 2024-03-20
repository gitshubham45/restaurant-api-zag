
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

 i.) After sign-up / login a token will be returned in response
 ii) Put that token in Authorization tab of collection selecting Bearer token option and save it.
 iii) Now try testing other endpoints in the collection
 ![screenshot](bearer.png)

 # endpoints
 ![screenshot](endpoints.png)