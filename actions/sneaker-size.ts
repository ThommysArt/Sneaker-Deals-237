"use server"

import db from "@/lib/prisma";
import { Sneaker, Sneaker_Size } from "@prisma/client";

export async function getSneakerSizes (sneakerId: string): Promise<Sneaker_Size[]> {
    const prisma = db()
    const sneaker_sizes = await prisma.sneaker_Size.findMany({
        where: {
            sneaker_id: sneakerId
        }
    })
    return sneaker_sizes
}

export async function createSneakerSize (sneaker: Sneaker, size: number): Promise<Sneaker_Size> {
    const prisma = db()
    const sneaker_size = await prisma.sneaker_Size.create({
        data: {
            sneaker_id: sneaker.id,
            size: size,
        }
    })
    return sneaker_size
}

export async function updateSneakerSize (id: number, available: boolean): Promise<Sneaker_Size> {
    const prisma = db()
    const sneaker_size = await prisma.sneaker_Size.update({
        where:{
            id: id,
        },
        data: {
            available: available,
        }
    })
    return sneaker_size
}

export async function deleteSneakerSize (id: number): Promise<boolean> {
    const prisma = db()
    await prisma.sneaker_Size.delete({
        where:{
            id: id,
        }
    })
    return true
}