# الأمير نت - مستخدم API لوحدة التحكم
# عدّل كلمة المرور قبل التشغيل.
/user group add name=amir-api policy=read,write,api comment="الأمير نت - وحدة التحكم" 
/user add name=amir-hotspot-api group=amir-api password="CHANGE_THIS_PASSWORD" comment="الأمير نت - وحدة التحكم"
# بعد ذلك قيّد خدمة API على عنوان خادم وحدة التحكم فقط، مثال:
# /ip service set api address=192.168.88.2/32
