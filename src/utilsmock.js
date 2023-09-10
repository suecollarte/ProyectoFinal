import { fakerES_MX as faker } from '@faker-js/faker'

export const mockProd = () => {
    return {
        code: faker.code.code(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.productAdjective(),
    stock: faker.number.int(),
    thumbnails: faker.image.dataUri()
    }
}