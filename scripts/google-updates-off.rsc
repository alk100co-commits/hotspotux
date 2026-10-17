# الأمير نت - حظر نطاقات Google Play بشكل عام عبر DNS
# ملاحظة: هذا الحظر عام على الشبكة، ويستخدم فقط إذا لم تستخدم وحدة التحكم per-client.
/ip dns static
:foreach d in={"play.googleapis.com";"android.clients.google.com";"android.googleapis.com";"dl.google.com";"gvt1.com";"gvt2.com"} do={
 :if ([:len [find where name=$d and comment="AMIR-GPLAY"]] = 0) do={add name=$d address=0.0.0.0 ttl=5m comment="AMIR-GPLAY"}
}
/ip dns cache flush
