function escapeHtml(str: string): string {
  if (!str) return "—";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function processLeadSubmission(data: any) {
  const { name, company, phone, email, message, fileName, fileBase64, fileType, source } = data || {};

  if (!name || !phone) {
    return {
      status: 400,
      json: { error: "Name and phone fields are required." }
    };
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

  const leadData = {
    timestamp,
    name: String(name).trim(),
    company: company ? String(company).trim() : "—",
    phone: String(phone).trim(),
    email: email ? String(email).trim() : "—",
    message: message ? String(message).trim() : "—",
    fileName: fileName ? String(fileName).trim() : "—",
    fileBase64: fileBase64 || "",
    fileType: fileType || "application/octet-stream",
    source: source || "Сайт ALEDO Uzbekistan"
  };

  const results: { telegram?: string; googleSheets?: string; driveFileUrl?: string } = {};
  let driveFileUrl = "";

  // 1. Google Sheets & Google Drive via Apps Script Web App
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (appsScriptUrl) {
    try {
      const gsRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });

      if (gsRes.ok) {
        const gsData = await gsRes.json().catch(() => null);
        results.googleSheets = "success";
        const urlFromGs = gsData?.driveUrl || gsData?.fileUrl;
        if (urlFromGs && typeof urlFromGs === 'string' && urlFromGs.startsWith('http')) {
          driveFileUrl = urlFromGs;
          results.driveFileUrl = urlFromGs;
        }
      } else {
        results.googleSheets = `error: status ${gsRes.status}`;
      }
    } catch (err: any) {
      console.error("Google Sheets error:", err);
      results.googleSheets = `error: ${err.message || "Failed to fetch Apps Script URL"}`;
    }
  } else {
    results.googleSheets = "skipped (GOOGLE_APPS_SCRIPT_URL not configured in Environment)";
  }

  // 2. Telegram Bot Integration
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramBotToken && telegramChatId) {
    try {
      const fileDisplay = driveFileUrl
        ? `<a href="${driveFileUrl}">${escapeHtml(leadData.fileName)}</a> 🔗 (Google Drive)`
        : escapeHtml(leadData.fileName);

      const textMessage = `
🔥 <b>НОВАЯ ЗАЯВКА С САЙТА ALEDO UZBEKISTAN</b>

👤 <b>Имя:</b> ${escapeHtml(leadData.name)}
🏢 <b>Компания/Бюро:</b> ${escapeHtml(leadData.company)}
📞 <b>Телефон:</b> <code>${escapeHtml(leadData.phone)}</code>
✉️ <b>Email:</b> ${escapeHtml(leadData.email)}
💬 <b>Сообщение / Расчет:</b>
${escapeHtml(leadData.message)}

📎 <b>Вложенный файл:</b> ${fileDisplay}
📍 <b>Источник:</b> ${escapeHtml(leadData.source)}
🕒 <b>Время Ташкент:</b> ${leadData.timestamp}
      `.trim();

      const tgRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: textMessage,
          parse_mode: "HTML",
          disable_web_page_preview: false
        })
      });

      const tgData = await tgRes.json();
      if (tgData.ok) {
        results.telegram = "success";
      } else {
        console.error("Telegram API response:", tgData);
        results.telegram = `error: ${tgData.description || "Failed to send message"}`;
      }
    } catch (err: any) {
      console.error("Telegram network error:", err);
      results.telegram = `error: ${err.message || "Network request failed"}`;
    }
  } else {
    results.telegram = "skipped (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in Environment)";
  }

  return {
    status: 200,
    json: {
      success: true,
      message: "Заявка успешно принята!",
      results,
      lead: leadData
    }
  };
}
