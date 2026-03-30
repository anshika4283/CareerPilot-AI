export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ reply: "Method not allowed" });
}

try {

const userMessage = req.body.message;

const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
method: "POST",
headers: {
"Authorization": "Bearer " + process.env.HF_TOKEN,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: "Answer clearly: " + userMessage
})
});

const data = await response.json();

let reply = "No response";

if (Array.isArray(data) && data[0]?.generated_text) {
reply = data[0].generated_text;
} else if (data.generated_text) {
reply = data.generated_text;
} else if (data.error) {
reply = "Error: " + data.error;
}

res.status(200).json({ reply });

} catch (error) {
res.status(500).json({ reply: "Server Error: " + error.message });
}

}
