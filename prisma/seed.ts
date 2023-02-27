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

  async function seedToopings() {
    await prisma.topping.createMany({
       data: [
         {
           name: "Pepperoni",
           price: 1.5,
           description: "Pepperoni",
           image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/toppings/pepperoni.png",
  },
  {name: 'Mozerella cheese',
          price: 1.5,
          description: 'Mozerella cheese',
          image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/mozcheese.jpg',},
  {name: 'Mushrooms',
          price: 1.5,
          description: 'Mushrooms',
          image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/mushroom.jpg',},
  {name: 'Onions',
          price: 1.5,
          description: 'Onions',
          image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/onions.jpg',},
          {name: 'Red Onions',
          price: 1.5,
          description: 'Red Onions',
          image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/redonion.jpg',},
  {name: 'Red Sauce',
          price: 0,
          description: 'Red Sauce',
          image:'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/redsauce.jpg',},
  {name: 'White Sauce',
          price: 0,
          description: 'White Sauce',
          image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/whitesauce.jpg',},
          {
            name:'Garlic',
            price: 1.5,
            description: 'Garlic',
            image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/garlic.jpg',
          },
          {
            name: 'Broccoli',
            price: 1.5,
            description: 'Broccoli',
            image: 'https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/Ingredients/brocolli.jpeg',

          }
        ],

          }
        )
      }

      async function seedStarters(){
        await prisma.starter.createMany({
           data: [
             {
               name: "Mozerella Sticks",
               price: 1.5,
               description: "Mozerella Sticks",
               image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/starters/mozzarellasticks.jpeg",
      },
      {
        name:"Ceasar Salad",
        price: 1.5,
        description: "Ceasar Salad",
        image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/starters/ceaser.jpg",
      },
      {
        name:"Chicken Fingers",
        price: 10.5,
        description: "Chicken Fingers",
        image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/starters/chickenfingers.jpeg",

      }

    ]
  })
      }

      async function seedPizzas(){
        await prisma.pizza.createMany({
            data: [
              {
                name: "Chicago Style",
                price: 15.0,
                description: "Chicago Style",
                image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzas/chicagostyle.jpeg",
              },
              {
                name: "New York Style",
                price: 15.0,
                description: "New York Style",
                image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzas/nycstyle.jpg",
              },
              {
                name: "Detroit Style",
                price: 15.0,
                description: "Detroit Style",
                image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzas/detroitstyle.png",
              },
              {
                name: "Greek Style",
                price: 15.0,
                description: "Greek Style",
                image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzas/greek-pizza.webp",

              },
              {
                name: "Thin Crust",
                price: 15.0,
                description: "Thin Crust",
                image: "https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzas/thincrust.jpg",

              }
            ]
          })
      }

    console.log(`Database has been seeded. 🌱`);




seed()
  .then(async () => {
    await seedDrinks();
    await seedToopings();
    await seedStarters();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });