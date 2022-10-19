
import * as faker from 'faker'
import * as dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client"
const fakerBook = ():any=>({
    createdAt: faker.date.between("2020-01-01", "2020-12-31"),
    updatedAt: faker.date.between("2020-01-01", "2020-12-31"),
    title:     faker.company.bs(),
    description: faker.company.bs(),
    author:  faker.name.firstName(),
}); 
const fakeUser = ():any=>({
    createdAt: faker.date.between("2020-01-01", "2020-12-31"),
    updatedAt: faker.date.between("2020-01-01", "2020-12-31"),
    email:     faker.internet.email(),
    firstName:  faker.name.firstName(),
    lastName: faker.name.lastName(),
});
const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({data:fakeUser()});
    const fakerRound = 100;
    dotenv.config();
    console.log('seeding');

    for(let i=0;i<fakerRound;i++){
        await prisma.book.create({data:fakerBook()});
    }
}


main()
.catch(e=>{
    console.log(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
})