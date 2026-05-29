const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12)

  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@prashaliskinsciences.com" },
  })
  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: "admin@prashaliskinsciences.com",
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
      },
    })
    console.log("✅ Admin user created")
  } else {
    console.log("ℹ️ Admin user already exists")
  }

  const existingDoctor = await prisma.doctor.findUnique({
    where: { slug: "dr-varsha-r-koti" },
  })
  if (!existingDoctor) {
    await prisma.doctor.create({
      data: {
        name: "Dr. Varsha R Koti",
        slug: "dr-varsha-r-koti",
        specialty: "Cosmetic Dermatology",
        bio: "Dr. Varsha R Koti is the founder of Prashali Skin Sciences with over 5 years of experience at Cutis. She specializes in cosmetic dermatology and is dedicated to providing personalized skin care solutions.",
        image: "",
        experience: 5,
        education: "MBBS, MD Dermatology",
      },
    })
    console.log("✅ Dr. Varsha R Koti created")
  } else {
    console.log("ℹ️ Dr. Varsha R Koti already exists")
  }

  console.log("✅ Seed completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
