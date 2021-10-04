import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

describe('RegisterCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers = prisma.customer.deleteMany();
    const deleteAllCities = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers, deleteAllCities]);

    await prisma.$disconnect();
  });

  it('should be able to create news customers', async () => {
    const city = await prisma.city.create({
      data: {
        country: 'Piauí',
        name: 'São João do Arraial',
      },
    });

    const response = await request(app)
      .post('/api/customers')
      .send({
        birth_date: new Date('10-14-1995'),
        full_name: 'Mateus Pinto Garcia',
        genre: 'MALE',
        city_id: city.id,
      });

    expect(response.body).toEqual('');
    expect(response.status).toBe(201);
  });
});
