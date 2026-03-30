export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ reply: "Only POST allowed" });
}

try {

const userMessage = req.body.message;

const response = await fetch("https://api.affiliateplus.xyz/api/chatbot", {
method: "GET"
});

const data = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(userMessage)}&botname=Nova&ownername=Anshika`);

const result = await data.json();

res.status(200).json({ reply: result.message });

} catch (error) {
res.status(500).json({ reply: "Error: " + error.message });
}

}
