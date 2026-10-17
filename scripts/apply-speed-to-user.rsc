# الأمير نت - تغيير سرعة مستخدم HotSpot في RouterOS v6
# الاستخدام الآمن: عدّل السطرين التاليين ثم شغّل السكربت من Terminal.
# لا تضع هذه القيم في صفحة HTML العامة.
:local targetUser "PUT_CARD_USERNAME_HERE"
:local targetProfile "AMIR-P-DEFAULT"

:local u [/ip hotspot user find where name=$targetUser]
:if ([:len $u] = 0) do={:error "لم يتم العثور على اسم المستخدم"}
:local p [/ip hotspot user profile find where name=$targetProfile]
:if ([:len $p] = 0) do={:error "ملف السرعة غير موجود. شغّل speed-profiles.rsc أولاً"}
/ip hotspot user set $u profile=$targetProfile

# إذا كان المستخدم متصلاً بالفعل، افصل الجلسة ليعاد تطبيق ملف السرعة عند تسجيل الدخول.
:local a [/ip hotspot active find where user=$targetUser]
:if ([:len $a] > 0) do={/ip hotspot active remove $a}
:log info ("AMIR-NET: تم تغيير سرعة ".$targetUser." إلى ".$targetProfile)
