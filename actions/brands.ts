"use server"

import { Brand } from "@prisma/client"
import db from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function getBrands (): Promise<Array<Brand>> {
    const prisma = db();
    const brands = await prisma.brand.findMany()
    return brands
 }

export async function createBrand (name:string): Promise<Brand> {
    const prisma = db();
    const newBrand = await prisma.brand.create({
        data: {
            name: name,
        }
    })
    return newBrand;
}

export async function getBrand(id: number): Promise<Brand|null> {
    const prisma = db();
    const brand = await prisma.brand.findUnique({
        where: {
            id: id,
        }
    })
    return brand
}

export async function updateBrand (id: number, name: string): Promise<Brand|null> {
    const prisma = db();
    const brand = await prisma.brand.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        }
    })
    return brand
}

export async function deleteBrand (id: number): Promise<boolean> {
    const prisma = db();
    await prisma.brand.delete({
        where: {
            id: id,
        }
    })

    return true
}