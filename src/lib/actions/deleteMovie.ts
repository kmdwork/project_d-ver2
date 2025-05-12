'use server'

import { redirect } from "next/navigation"
import { prisma } from "../prisma"

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

export async function deleteMovie(itemId: string):Promise<ActionState> {
    await prisma.movie.delete({ where: {id: itemId} })
    redirect('/mydvdbox/dvdtable')
}