const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// تحميل الجلسة من ملف
let sessionData;
try {
    sessionData = require('./session.json');
} catch (error) {
    console.log('لا يوجد جلسة محفوظة، سيتم توليد QR');
}

// إنشاء العميل مع الجلسة المحفوظة أو بدونها
const client = new Client({
    authStrategy: sessionData ? new LocalAuth({ session: sessionData }) : undefined
});

client.on('ready', () => {
    console.log('البوت شغال باستخدام الجلسة المحفوظة!');
});

client.on('message', message => {
    if (message.body === 'سلام') {
        message.reply('وعليكم السلام!');
    }
});

// حفظ الجلسة في ملف بعد الاتصال
client.on('authenticated', (session) => {
    fs.writeFileSync('./session.json', JSON.stringify(session));
});

client.initialize();
