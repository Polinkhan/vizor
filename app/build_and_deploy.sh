#!/bin/bash

# Define your variables
timestamp=$(date '+%Y%m%d%H%M%S')
remote_server="root@139.162.17.88"
remote_dir="/var/www/html/nippon_app"
backup_dir="${remote_dir}_backup_${timestamp}"
local_build_dir="dist"
root_password="p1c]r6X+Ob18"

# Exit immediately if a command exits with a non-zero status
set -e

# Clean up (previous build)
echo -e "\n-----------------------------------------\n### Cleaning up previous build. ###\n-----------------------------------------\n"
rm -rf ${local_build_dir}

sleep 2
clear

# Install dependencies
echo -e "\n-------------------------------------\n### Installing dependencies. ###\n-------------------------------------\n"
npm install
echo -e "\n------------------------------------\n### Dependencies installed. ###\n------------------------------------\n"

sleep 2
clear

# Build the React application
echo -e "\n----------------------------------\n### Building for production. ###\n----------------------------------\n"
npm run build
zip -r dist.zip ${local_build_dir}
echo -e "\n-------------------------\n### Build complete. ###\n-------------------------\n"

sleep 2
clear

echo -e "\n-------------------------------------\n### SSH to remote server. ###\n-------------------------------------\n"

# Check if the directory exists on the remote server
echo "Checking if /dist directory exists"
sshpass -p "${root_password}" ssh "${remote_server}" "[ -d '${remote_dir}' ] && echo -e 'Directory exists\n' || echo -e 'Directory does not exist\n'"

# If the directory exists, rename it to a backup directory with timestamp
sshpass -p "${root_password}" ssh "${remote_server}" "[ -d '${remote_dir}' ] && mv '${remote_dir}' '${backup_dir}' && echo -e 'Directory backup complete\n'"

sleep 2
clear

# Upload the build files to production
echo -e "\n-------------------------------------------------\n### Uploading the build files to production ###\n-------------------------------------------------\n"
sshpass -p "${root_password}" scp dist.zip "${remote_server}:${remote_dir}.zip"
sshpass -p "${root_password}" ssh "${remote_server}" "unzip '${remote_dir}.zip' -d '${remote_dir}'"
sshpass -p "${root_password}" ssh "${remote_server}" "rm '${remote_dir}.zip'"
echo -e "\n------------------------------\n### Uploading Complete ###\n------------------------------\n"

sleep 2
clear

# Clean up (local)
echo -e "\n-----------------------------------------\n### Cleaning up local files. ###\n-----------------------------------------\n"
rm -rf ${local_build_dir}
rm dist.zip

sleep 2
clear

echo -e "\n---------------------------------------------------------\n### Build and deployment completed successfully. ###\n---------------------------------------------------------\n"
