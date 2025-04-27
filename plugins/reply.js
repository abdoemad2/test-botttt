// plugins/reply.js

module.exports = (message) => {
    // تحقق من محتوى الرسالة
    if (message.body.toLowerCase() === 'مرحبا') {
        message.reply('مرحبًا! كيف يمكنني مساعدتك؟');
    }
    else if (message.body.toLowerCase() === 'مساعدة') {
        message.reply('هذه هي قائمة الأوامر المتاحة:\n1. مرحبا - لتحية البوت\n2. مساعدة - لعرض هذه القائمة');
    }
    else if (message.body.toLowerCase() === 'وداعا') {
        message.reply('وداعًا! أتمنى لك يومًا سعيدًا!');
    }
};
