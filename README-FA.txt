Glisse Phone — نسخه بدون CDN در زمان اجرا

این فایل ZIP سورس است؛ مستقیما روی cPanel آپلود نکنید.

ساخت با کامپیوتر (Windows/Mac/Linux):
1. Node.js نسخه 22 یا جدید را نصب کنید.
2. در پوشه پروژه Terminal / PowerShell باز کنید.
3. دستور npm install را اجرا کنید.
4. دستور npm run build را اجرا کنید.
5. محتوای پوشه dist (نه خود سورس) را در public_html/glisse-phone آپلود کنید.
6. https://yourdomain.com/glisse-phone/ را باز کنید.

اگر Node.js نصب ندارید:
- سورس را در یک مخزن GitHub آپلود کنید (شامل پوشه .github).
- به Actions > Build deployable Glisse phone > Run workflow بروید.
- پس از پایان اجرا، Artifact با نام glisse-phone-cpanel-dist را دانلود کنید.
- آن را Extract و محتوای آن را در پوشه هاست آپلود کنید.

بعد از build نهایی، اجرای وب‌اپ نیازی به esm.sh، jsDelivr یا اتصال به npm ندارد.
پیش از build یک‌بار اینترنت برای نصب پکیج‌ها لازم است.

توجه: این یک دمو است؛ تماس SIP واقعی ندارد.
کتابخانه اصلی: https://github.com/0kzh/glisse
