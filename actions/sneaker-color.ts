"use server"

import db from "@/lib/prisma";
import { Sneaker, Sneaker_Color } from "@prisma/client";

export async function getSneakerColors (sneakerId: string): Promise<Sneaker_Color[]> {
    const prisma = db()
    const sneaker_colors = await prisma.sneaker_Color.findMany({
        where: {
            sneaker_id: sneakerId,
        }
    })
    return sneaker_colors
}

export async function createSneakerColor (sneaker: Sneaker, color: string): Promise<Sneaker_Color> {
    const prisma = db()
    const sneaker_color = await prisma.sneaker_Color.create({
        data: {
            sneaker_id: sneaker.id,
            color: color,
        }
    })
    return sneaker_color
}

export async function updateSneakerColor (id: number, available: boolean): Promise<Sneaker_Color> {
    const prisma = db()
    const sneaker_color = await prisma.sneaker_Color.update({
        where:{
            id: id,
        },
        data: {
            available: available,
        }
    })
    return sneaker_color
}

export async function deleteSneakerColor (id: number): Promise<boolean> {
    const prisma = db()
    await prisma.sneaker_Color.delete({
        where:{
            id: id,
        }
    })
    return true
}