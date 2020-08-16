TO RUN THE PROJECT:

git clone https://server.ivfuture.eu/students/onlinesh_shop.git

cd onlinesh_shop/ && yarn install && cd client/ && yarn install

cd .. 

yarn run dev

**Pentru a face un nou MR comenzile ar trebui sa fie in ordinea urmatoare:**
1. git add . sau git add [nume fisier]
2. git commit -m "[ fraza care sa defineasca cat mai clar ce contine commit-ul vostru ]"
3. git checkout master
4. git pull
5. git checkout [branch-ul vostru pe care ati facut commit-ul]
6. git rebase master
7. verificati daca modificarile voastre si modificarile aduse din master exista in cod si rulati aplicatia sa vedeti ca functioneaza in continuare modificarile voastre
8. git push

pasii: 3,4,5,6 -> vor aduce modificarile din master facute de colegii vostri peste modificarile voastre in branch-ul vostru astfel incat sa fiti mereu la ultima varianta de cod.
