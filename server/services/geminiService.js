const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Aapke original models - JO WORK KAR RAHE HAIN
const MODELS = [
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-2.0-flash",
];

// ✅ IMPROVED PROMPT - Chhota aur precise
const SYSTEM_PROMPT = `
You are a Frontend Developer.

Generate a COMPLETE single-file website based on the user request.

RULES:
1. Return ONLY complete HTML from <!DOCTYPE html> to </html>
2. Include ALL CSS inside <style> in <head>
3. Include ALL JavaScript inside <script> before </body>
4. Include these sections: Navbar, Hero, About, Services, Projects, Testimonials, Contact, Footer
5. Use Font Awesome for icons
6. Make it responsive
7. Never use markdown or backticks
8. Never explain anything

Return ONLY the HTML.`;

async function generateHTML(prompt) {
  let lastError;

  for (const model of MODELS) {
    try {
      console.log(`🚀 Trying ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: `${SYSTEM_PROMPT}

User Request:
${prompt}`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 16384, // ✅ 8192 se 16384 kiya (double)
        },
      });

      let html =
        typeof response.text === "function"
          ? response.text()
          : response.text;

      if (!html || html.trim() === "") {
        throw new Error("Model returned empty response.");
      }

      html = cleanHTML(html);

      // ✅ Check if HTML is complete
      if (!html.includes('</html>')) {
        console.warn('⚠️ Incomplete HTML - missing closing </html>');
        // Try to fix by adding closing tags
        if (!html.includes('</body>')) {
          html += '\n</body>\n</html>';
        } else if (!html.includes('</html>')) {
          html += '\n</html>';
        }
      }

      console.log(`✅ Success using ${model}`);
      console.log(`📄 HTML length: ${html.length} characters`);
      console.log(`📄 Has </html>? ${html.includes('</html>')}`);

      return html;
    } catch (err) {
      console.log(`❌ ${model} failed`);
      console.log(err.message);
      lastError = err;
    }
  }

  throw lastError;
}

function cleanHTML(html) {
  html = html.replace(/```html/gi, "");
  html = html.replace(/```/g, "");
  html = html.trim();

  if (!html.toLowerCase().startsWith("<!doctype")) {
    html = "<!DOCTYPE html>\n" + html;
  }

  return html;
}

module.exports = {
  generateHTML,
};