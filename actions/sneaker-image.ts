"use server"

import { Sneaker_Image, Sneaker } from "@prisma/client"
import db from "@/lib/prisma"

export async function getSneakerImages (id: string): Promise<Array<Sneaker_Image>> {
    const prisma = db()
    const sneaker_images =  await prisma.sneaker_Image.findMany({
        where: {
            sneaker_id: id,
        }
    })
    return sneaker_images
}

export async function createSneakerImages (sneakerId: string, image: string): Promise<boolean> {
    const prisma = db();
    await prisma.sneaker_Image.create({
        data: {
        sneaker_id: sneakerId,
        image: image,
        },
    });
    return true
}

export async function deleteSneakerImages (id: number): Promise<boolean> {
    const prisma = db()
    await prisma.sneaker_Image.delete({
        where: {
            id: id
        }
    })
    return true
}