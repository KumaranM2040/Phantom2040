# CloudFlare DNS Updater

## Introduction
This application is called the CloudFlare DNS Updater. Its purpose is to interact with the CloudFlare API for the silverlanternslight.com domain so that it can update the CloudFlare DNSA entry so that CloudFlare can route all HTTP/HTTPS traffic to the machine that this application is running on. In my case this application is running in a docker container on my Raspberry Pi 3B+.

## Self Hosting
This reason for this is because I wanted to self-host various websites on the silverlanternslight.com domain. This allowed me to learn more about building and deploying applications to "Production" but also allowed me to experiment with various tools and code.

## How does it work
The application determines the Raspberry Pis public ip address via https://api.ipify.org. It then updates the DNSA entry via CloudFlares developer API to the current public ip address of the Pi. It does this every 30min if there is an IP address change. Since it is well known that ISPs dont generally provide static IP addresses to customers (without special requests) this implementation was born of need. It also provides a level of portability as the application is now not dependent on an ISP static IP address. If you change your ISP or run the Pi of a 4g/5g backend, nothing is changed on the application or the Pi side. There will be some router configuration changes but those are unavoidable due to default security restrictions that are enabled on Routers.

## The Bigger Picture
This application is part of a larger ecosystem of applications that are required to be running on the Pi for it to be reachable/controlable from the internet.