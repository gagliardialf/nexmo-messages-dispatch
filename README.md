# Messages and Dispatch APIs Certification

This demo application notifies a customer that his package will be delivered tomorrow.

The first attempt to contact him is performed using a plain SMS message.

If that fails to elicit a response (after 180 seconds), the app sends another failover SMS message

#### _RUNNING INSTRUCTION_
1. copy the file with the Nexmo private key
2. add a .env file with the following keys:
   `NEXMO_API_KEY`
   `NEXMO_API_SECRET`   
   `NEXMO_APPLICATION_ID`
   `NEXMO_APPLICATION_PRIVATE_KEY_PATH`
   `FROM_NUMBER`
3. install the packages (`npm i`)
4. run the application (`node index.js DESTINATION_NUMBER`)
