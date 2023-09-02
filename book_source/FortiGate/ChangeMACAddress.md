## Set/Change MAC addresses associated with a FortiGate interface

1. Set the MAC Address on the Interface
```conf
config system interface
edit [WAN-Interface]
set macaddr <MAC address>
end
```

2. Restart the routing engine on the FortiGate
```conf
exec router restart
```
