---
id: ipv6
title: IPv6
sidebar_position: 3
---

## IPv6 for FortiGate-50E

From the FortiGate admin interface, you will not find a complete IPv6 management interface, only the IPv6 function switch. To use IPv6, start by enabling it.

![](https://i.imgur.com/AEccpOo.png)

Next, open the CLI interface from the button in the top-right corner of the admin interface.

![](https://i.imgur.com/JRvwWHU.png)

Then enter the following commands. Replace `[WAN Interface]` and `[LAN Interface]` with the interface names defined under `Network -> Interface` in the FortiGate admin interface.

### Configure the External Network Interface

```conf
config sys int
   edit [WAN Interface]
      config ipv6
         set ip6-mode pppoe
         set ip6-allowaccess ping
         set dhcp6-prefix-delegation enable
         set autoconf enable
      end
   next
end
```

When `autoconf` is `enable`, the interface works as an `SLAAC client`.

`dhcp6-prefix-delegation` enables `DHCP-PD`, which allows the FortiGate to retrieve delegated prefix information from the ISP.

### Configure the Local Network Interface

If there are multiple local network interfaces, configure each of them.

```conf
config sys int
   edit [LAN Interface]
      config ipv6
         set ip6-mode delegated
         set ip6-send-adv enable
         set ip6-manage-flag disable
         set ip6-other-flag enable
         set ip6-upstream-interface "[WAN Interface]"
         set ip6-subnet ::1/64
         config ip6-delegated-prefix-list
            edit 1
               set upstream-interface "[WAN Interface]"
               set autonomous-flag enable
               set onlink-flag enable
               set subnet ::/64
            next
         end
      end
   next
end
```

### Set IPv6 DNS

This can be configured from the admin interface. You can use either your ISP or Google public DNS.

CHT:

- Primary IPv6 DNS: `2001:b000:168::1`
- Secondary IPv6 DNS: `2001:b000:168::2`

Google:

- Primary IPv6 DNS: `2001:4860:4860::8888`
- Secondary IPv6 DNS: `2001:4860:4860::8844`

![](https://i.imgur.com/PEIxolT.png)

### Set Up an IPv6 DHCP Server

If there are several local network interfaces, configure each of them.

```conf
config sys dhcp6 server
   edit 1
      set interface "[LAN Interface]"
      set ip-mode delegated
      set dns-service default
      set upstream-interface "[WAN Interface]"
   next
end
```

At this point you should be able to obtain an IPv6 address automatically from CHT. If domain names still cannot be resolved correctly, an IPv6 policy is probably missing.

### Set Up IPv6 Policies

Add a policy for IPv6 traffic from the local network to the external network. The example below assumes an allow-all policy, but you can restrict it to match your environment.

![](https://i.imgur.com/zM6BOUW.png)

Wait `5~15` seconds, then run:

```bash
diag ipv6 address list
```

Check whether the LAN interface has obtained an IPv6 address starting with `2001`.

If not, reboot the FortiGate and run the diagnostic command again.