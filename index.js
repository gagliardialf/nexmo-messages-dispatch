require('dotenv').config();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APPLICATION_ID,
    privateKey: process.env.NEXMO_APPLICATION_PRIVATE_KEY_PATH
});

const validateNumber = (number) => {
    var pattern = new RegExp("^\\+?\\d{10,14}$");
    return pattern.test(number);
}

if (process.argv.length < 3) {
    console.log('Please specify the destination number');
    console.log('USAGE: node index.js DESTINATION_NUMBER');
} else {
    if(!validateNumber(process.argv[2])) {
        console.log('Invalid destination number. Please specify a number with E164 format');
    } else {
        console.log(`Creating dispatch for number ${process.argv[2]}`)
        nexmo.dispatch.create(
            "failover", [
                {
                    from: { type: "sms", number: process.env.FROM_NUMBER },
                    to: { type: "sms", number: process.argv[2] },
                    message: {
                        content: {
                            type: "text",
                            text: "ACME Delivers: your package will be delivered tomorrow."
                        }
                    },
                    failover: {
                        expiry_time: 180,
                        condition_status: "read"
                    }
                },
                {
                    from: { type: "sms", number: process.env.FROM_NUMBER },
                    to: { type: "sms", number: process.argv[2] },
                    message: {
                        content: {
                            type: "text",
                            text: "ACME Delivers: your package will be delivered tomorrow (second notification)"
                        }
                    }
                }
        ], (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Done. Dispatch uuid: ${data.dispatch_uuid}`);
            }
        });
    }
}
