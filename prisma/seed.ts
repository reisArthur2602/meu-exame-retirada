import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { Role, UserStatus } from '../src/generated/prisma/enums';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@admin.com';
    const plainPassword = 'admin123';

    const passwordHash = await bcrypt.hash(plainPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            nome: 'Administrador',
            email,
            passwordHash,
            role: Role.ADMIN,
            status: UserStatus.ativo,
        },
    });

    console.log(`✅ Usuário admin criado: ${admin.email} (id: ${admin.id})`);
    console.log(`   Senha: ${plainPassword}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
