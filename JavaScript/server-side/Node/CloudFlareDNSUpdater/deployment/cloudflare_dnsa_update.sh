#!/bin/bash
docker run --name slldnsupdater --restart on-failure:10 kumaranm2040/slldnsupdater &
docker run --name uhvagdnsupdater --restart on-failure:10 kumaranm2040/uhvagdnsupdater
