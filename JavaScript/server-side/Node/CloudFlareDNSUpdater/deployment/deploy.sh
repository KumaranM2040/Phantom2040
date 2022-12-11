#!/bin/bash
# execute bash script in the same folder as this script
cd "$(dirname "$0")"

cp -rf cloudflare_dnsa_update_stop.sh /usr/local/bin
cp -rf cloudflare_dnsa_update.sh /usr/local/bin

# If return status 4 then systemd service does not exist so we need to create it
# If return status 0 then systemd service exists and is running so we need to stop it, then update and start it again.

systemctl status cloudflare-dns-updater.service
if [ $? = '4' ]
then
   echo "cloudflare-dns-updater.service does not exist so creating it"
   cp -rf cloudflare-dns-updater.service /etc/systemd/system
   systemctl daemon-reload
   systemctl start cloudflare-dns-updater.service
   systemctl enable cloudflare-dns-updater.service
   echo "cloudflare-dns-updater.service created successfully and running"
elif [ $? = '0' ]
then
   echo "cloudflare-dns-updater.service is running so stop the service, update and start it again"
   sh cloudflare_dnsa_update_stop.sh
   systemctl stop cloudflare-dns-updater.service
   cp -rf cloudflare-dns-updater.service /etc/systemd/system/cloudflare-dns-updater.service
   systemctl daemon-reload
   systemctl start cloudflare-dns-updater.service
else
   echo "cloudflare-dns-updater.service had an error $?"
fi
