الأمير نت - سكربتات RouterOS v6
================================

speed-profiles.rsc
------------------
ينشئ ملفات السرعة:
AMIR-P-HOTSPOT = 1M/2M
AMIR-P-ECO = 256k/512k
AMIR-P-DEFAULT = 512k/1M
AMIR-P-MEDIUM = 1M/2M
AMIR-P-HIGH = 2M/4M
AMIR-P-VERYHIGH = 2M/6M

name-only-login.rsc
-------------------
يضبط HotSpot profile على http-pap حتى يمكن استخدام اسم المستخدم فقط. عدّل hsprof1 قبل التشغيل.

controller-user.rsc
-------------------
ينشئ مستخدم API مخصصاً لوحدة التحكم. غيّر كلمة المرور قبل التشغيل.

controller-walled-garden.rsc
----------------------------
يسمح لصفحة HotSpot بالوصول إلى خادم وحدة التحكم قبل تسجيل الدخول. عدّل العنوان والمنفذ.

google-updates-off.rsc / google-updates-on.rsc
-----------------------------------------------
حظر عام اختياري عبر DNS. الاستخدام الموصى به مع الواجهة هو controller/api.php لأنه ينشئ حظراً خاصاً بعنوان العميل.

apply-speed-to-user.rsc
-----------------------
تغيير يدوي لسرعة مستخدم من Terminal. عدّل targetUser وtargetProfile.
