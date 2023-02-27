import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const email = (await process.env.SEED_EMAIL) as string

    // cleanup the existing database
    await prisma.user.delete({ where: { email: email } }).catch(() => {
      // no worries if it doesn't exist yet
    })

    const hashedPassword = (await process.env.HASHEDPASSWORD) as string

     await prisma.user.create({
      data: {
        email,
       password: hashedPassword,
       username:'Derick',
       userAddresses : {
        create: {
           firstName: 'Derick',
        lastName: 'Mwiti',
        streetAddress: '4715 N. Racine Avenue',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60640',
        mobilePhone: '773-999-9999',
        deliveryInstructions: 'Ring the bell',
        isDefault: true,
      }
        }
      },
    })
  }

  async function seedDrinks() {
   await prisma.drink.createMany({
      data: [
        {
          name: "Coke",
          price: 1.5,
          description: "Coke",
          image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/drinks/coke.png",


    },
    {name: "Sprite",
          price: 1.5,
          description: "Sprite",
          image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/drinks/mountaindew.png",},
    {name: "Mountain Dew",
          price: 1.5,
          description: "Mountain Dew",
          image: "https://www.coca-cola.com/content/dam/journey/us/en/private/brands/coca-cola/coca-cola-bottle.png",}
      ],
    })
  }



    console.log(`Database has been seeded. 🌱`);




seed()
  .then(async () => {
    await seedDrinks();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });