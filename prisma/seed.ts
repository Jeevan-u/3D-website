import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12)
  await prisma.user.upsert({
    where: { email: "admin@prashaliskinsciences.com" },
    update: {},
    create: {
      email: "admin@prashaliskinsciences.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  })

  // Create Dr. Varsha R Koti
  await prisma.doctor.upsert({
    where: { slug: "dr-varsha-r-koti" },
    update: {},
    create: {
      name: "Dr. Varsha R Koti",
      slug: "dr-varsha-r-koti",
      specialty: "Cosmetic Dermatology",
      bio: "Dr. Varsha R Koti is the founder of Prashali Skin Sciences with over 5 years of experience at Cutis. She specializes in cosmetic dermatology and is dedicated to providing personalized skin care solutions.",
      image: "",
      experience: 5,
      education: "MBBS, MD Dermatology",
    },
  })

  console.log("✅ Seed completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
