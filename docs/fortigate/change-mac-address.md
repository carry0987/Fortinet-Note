---
id: change-mac-address
title: Change MAC Address
sidebar_position: 2
---

## Set or Change the MAC Address on a FortiGate Interface

1. Set the MAC address on the target interface.

```conf
config system interface
edit [WAN-Interface]
set macaddr <MAC address>
end
```

2. Restart the routing engine on the FortiGate.

```conf
exec router restart
```