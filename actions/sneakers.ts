"use server"

import { Brand, Sneaker } from "@prisma/client"
import db from "@/lib/prisma"

export async function getSneakers (): Promise<Array<Sneaker>> {
    const prisma = db()
    const sneakers = await prisma.sneaker.findMany()
    return sneakers
}


export async function createSneaker (brand: Brand, name: string, price: number): Promise<Sneaker> {
    const prisma = db();
    const sneaker =  await prisma.sneaker.create({
        data: {
            brand_id: brand.id,
            name: name,
            price: price,
        }
    })
    return sneaker
}

export async function getSneaker (id: string): Promise<Sneaker|null> {
    const prisma = db()
    const sneaker =  await prisma.sneaker.findUnique({
        where: {
            id: id,
        }
    })
    return sneaker
}

export async function updateSneaker (id: string, brand: Brand, name: string, price: number): Promise<Sneaker> {
    const prisma = db()
    const sneaker =  await prisma.sneaker.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            price: price,
            brand_id: brand.id
        }
    })
    return sneaker
}

export async function deleteSneaker (id: string): Promise<boolean> {
    const prisma = db()
    await prisma.sneaker.delete({
        where: {
            id: id,
        }
    })
    return true
}