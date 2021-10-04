import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';
import { v4 } from 'uuid';

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
    expect(
      await prisma.customer.findFirst({
        where: {
          full_name: 'Mateus Pinto Garcia',
        },
      }),
    ).toBeTruthy();
  });

  it('should not be to register new customers with wrong city_id!', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        birth_date: new Date('10-14-1995'),
        full_name: 'Mateus Pinto Garcia',
        genre: 'MALE',
        city_id: v4(),
      });

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CityNotFoundError');
    expect(response.status).toBe(404);
  });

  it('should not be to register new customers with non-existent gender!', async () => {
    const city = await prisma.city.create({
      data: {
        country: 'Piauí',
        name: 'Esperantina',
      },
    });

    const response = await request(app)
      .post('/api/customers')
      .send({
        birth_date: new Date('10-14-1995'),
        full_name: 'Luzia Pinto Garcia',
        genre: 'MALE_FEMALE',
        city_id: city.id,
      });

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('InvalidGenreError');
    expect(response.status).toBe(400);
  });
});
