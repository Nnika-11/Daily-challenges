#!/bin/bash


#I have a simple web page that reads local data and time similar with example = index.html.
#It reads all values from system 
#DATE=$(date '+%m/%d/%Y')
#HRS=$(date '+%H')
#MIN=$(date '+%M')

#The task is allow user to change time manually (deactivate NTP) or Enable NTP to automatic fill in.
#additionally I handeled NTP option changes

# user data 
# DATE = 09/10/2019, HRS =13, MINS = 21 (data given as an exapmle of the format)
# NTP_STAT (ntp enable cliked or not = null?)
# NTP_SERVER=ip address

#timesyncd.conf configuration file control NTP network time synchronization.

if [ -n "${NTP_SERVER}" ] ; then
   sudo sed -i "s/^#*NTP=/NTP=${NTP_SERVER}/" /etc/systemd/timesyncd.conf
   # if you need specific file to take var value from
   #sed '/FallbackNTP/d;/NTP/ a\var' /etc/systemd/timesyncd.conf
   sudo sed -i "s/^#*FallbackNTP/FallbackNTP/" /etc/systemd/timesyncd.conf
else
  sudo sed -i 's/^NTP=/#NTP=/' /etc/systemd/timesyncd.conf
  sudo sed -i 's/^FallbackNTP/#FallbackNTP/'  /etc/systemd/timesyncd.conf

fi
if [ "${NTP_STAT}" == "Enable" ] ; then
  sudo timedatectl set-ntp true
  sleep 3
  #too long I still thinking how to solve it
else
  month=`echo $DATE | awk -F %2F '{print $1}'`
  day=`echo $DATE | awk -F %2F '{print $2}'`
  year=`echo $DATE | awk -F %2F '{print $3}'`

  new_date="$year$month$day $HRS:$MINS"
  sudo timedatectl set-ntp false
  sudo date --set="$new_date"
fi