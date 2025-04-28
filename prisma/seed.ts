import { PrismaClient } from "../src/generated/prisma";
import { hash } from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
    //クリーンアップ
    await prisma.movie.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await hash('password123', 12)

    //ユーザー作成
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            movies: {
                create: [
                    { title: "Dummy Movie 1",notes: "This is a test movie.", dvdBoxNumber: 1, dvdNumber: 1 },
                    { title: "Dummy Movie 2",tmdbId: 62, dvdBoxNumber: 1, dvdNumber: 2 }
                ]
            }
        }
    })

    console.log( { user } );
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })