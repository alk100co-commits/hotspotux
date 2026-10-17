# الأمير نت - تفعيل دخول HotSpot باسم المستخدم فقط
# غيّر اسم profile في السطر التالي إذا كان ملف HotSpot لديك اسمه مختلفاً.
:local hotspotProfile "hsprof1"
:local id [/ip hotspot profile find where name=$hotspotProfile]
:if ([:len $id] = 0) do={:error "لم يتم العثور على HotSpot profile: $hotspotProfile"}
/ip hotspot profile set $id login-by=http-pap
:put "تم ضبط $hotspotProfile على HTTP-PAP. أنشئ مستخدمي HotSpot بدون كلمة مرور."
