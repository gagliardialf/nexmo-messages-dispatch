# Messages and Dispatch APIs Certification

This demo application notifies a customer that his package will be delivered tomorrow.

The first attempt to contact him is performed using a plain SMS message.

If that fails to elicit a response (after 180 seconds), the app sends another failover SMS message

USAGE: node index.js DESTINATION_NUMBER
