## IPv6 for FortiGate-50E
From the Fortigate admin interface, you will not find a complete IPv6 management interface, only the IPv6 function switch. To use IPv6, start by switching this on.
![](https://i.imgur.com/AEccpOo.png)

Next, you will have use CLI interface to configure IPv6. You can open the CLI interface from the button in the top right corner of the admin interface.
![](https://i.imgur.com/JRvwWHU.png)

Then input the following commands in the CLI interface on the right. Please note that **[WAN Interface]** and **[LAN Interface]** represent `Network -> Interface` for the external and local network interface names. Please adjust according to the definitions in the Fortigate admin interface.
- Configure the external network interface (WAN)
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
When `autoconf` is `enable`, this sets the `interface` as **`SLAAC client`**.
`dhcp6-prefix-delegation` enables `DHCP-PD`, to communicate with ISP to get prefix information.

- Configure the local network interface
If there are multiple local network interfaces, you will have to configure each of them.
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

- Set IPv6 DNS settings
This can be set through the admin interface. You can select either your ISP (CHT) or Google for your IPv6 DNS Server, both offer quick response times.

  CHT:
  Primary DNS server IP(ipv6): `2001:b000:168::1`
  Secondary DNS server IP(ipv6): `2001:b000:168::2`

  Google:
  Primary DNS server IP(ipv6): `2001:4860:4860::8888`
  Secondary DNS server IP(ipv6): `2001:4860:4860::8844`

![](https://i.imgur.com/PEIxolT.png)

- Set up an IPv6 DHCP Server
If there are several local network interfaces, you need to configure each of them.
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
Now you should be able to get the IPv6 address automatically from CHT, but after some testing you might find that the Domain Name still can't be queried correctly. A Google search shows that the IPv6 policy setting was missed.

- Set up IPv6 policies
Add a policy for IPv6 local network to external network. In fact, you can adjust the policy according to your needs. The following example is set to accept all.

![](https://i.imgur.com/zM6BOUW.png)

Wait for **5~15** seconds.
Then test with:
```linux
diag ipv6 address list
```
Note if the LAN interface has obtained an IPv6 address starting with 2001.
If not, please reboot the FGT.
Then check again with diag.
