# Local testing

```
# adjust the hosts file
sudo nano /etc/hosts

# then have the new settings take effect by
sudo killall -HUP mDNSResponder
```


# Running the reverse-proxy

If unable to bind to low 80, 443 ports, run the proxy with ```sudo```, but only while testing.

For production environment, ALWAYS [edit the iptables](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=edit+iptables&*) and forward to higher ports and application running with least priviledges:

* edit iptables on [ubuntu](https://help.ubuntu.com/community/IptablesHowTo)
* edit iptables on [mac os](http://serverfault.com/questions/102416/iptables-equivalent-for-mac-os-x)

# Certificates

Never put the certificates in this project. Manage separately together with the reverse proxy configuration file. 

