// import { PrismaClient, Role } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function main() {
//   const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@mustcode.com";
//   const adminPassword =
//     process.env.INITIAL_ADMIN_PASSWORD || "mustcodeAdmin@123";

//   // Check if initial admin already exists
//   const existingAdmin = await prisma.user.findUnique({
//     where: { email: adminEmail },
//   });

//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash(adminPassword, 12);

//     // 1. Ensure the ADMIN role exists in the Role table
//     const adminRole = await prisma.role.upsert({
//       where: { name: "ADMIN" },
//       update: {},
//       create: {
//         name: "ADMIN",
//         description: "System Administrator with full permissions",
//       },
//     });

//     // 2. Ensure the System Admin user exists and is linked to the ADMIN role
//     await prisma.user.upsert({
//       where: { email: adminEmail },
//       update: {},
//       create: {
//         email: adminEmail,
//         password: hashedPassword,
//         name: "System Admin",
//         role: {
//           connect: { id: adminRole.id },
//         },
//       },
//     });

//     console.log("✅ Initial Admin created successfully!");
//   } else {
//     console.log("ℹ️ Admin already exists. Skipping seed.");
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
