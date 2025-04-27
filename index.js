const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const replyPlugin = require('./plugins/reply');  // استيراد الـ Plugin الجديد

let sessionData;
try {
    sessionData = require('./session.json');
} catch (error) {
    console.log('لا يوجد جلسة محفوظة، سيتم توليد QR');
}

const client = new Client({
    authStrategy: sessionData ? new LocalAuth({ session: sessionData }) : undefined
});

client.on('ready', () => {
    console.log('البوت جاهز!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('يرجى مسح هذا الكود QR باستخدام تطبيق واتساب.');
});

client.on('message', (message) => {
    // استدعاء الـ Plugin للرد على الرسائل
    replyPlugin(message);
});

// حفظ الجلسة بعد التوثيق
client.on('authenticated', (session) => {
    fs.writeFileSync('./session.json', JSON.stringify(session));
});

client.initialize();
