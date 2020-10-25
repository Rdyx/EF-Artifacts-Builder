# Since this website is now hosted on Github pages, some process has to be done
# This file is used to push "build" folder after npm run build has been done

npm run build

cd build/

# Create CNAME file for github page redirection
touch CNAME
echo "efab.ovh" >> CNAME

# Init git repo since every build destroy the folder
git init
git remote add origin https://github.com/Rdyx/EF-Artifacts-Builder.git
git checkout -b build
git add *
git commit -m "Push build"
git push origin build -f