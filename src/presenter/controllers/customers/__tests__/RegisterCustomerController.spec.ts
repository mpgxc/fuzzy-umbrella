/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import faker from 'faker';
import request from 'supertest';
import { v4 } from 'uuid';

import { City } from '.prisma/client';

let city: City;

describe('RegisterCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers = prisma.customer.deleteMany();
    const deleteAllCities = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers, deleteAllCities]);

    await prisma.$disconnect();
  });

  beforeEach(async () => {
    city = await prisma.city.create({
      data: {
        country: faker.address.state(),
        name: faker.address.city(),
      },
    });
  });

  it('should be able to create news customers', async () => {
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
        full_name: faker.name.findName(),
        genre: 'MALE',
        city_id: v4(),
      });

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CityNotFoundError');
    expect(response.status).toBe(404);
  });

  it('should not be to register new customers with non-existent gender!', async () => {
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

  it('should not be to register new customers with wrongs props', async () => {
    /**
     * Todos os campos estão preenchidos de maneira incorreta
     */
    type ValidationPropsError = {
      status: string;
      type: string;
      message: string;
      label: string;
    };

    const response = await request(app)
      .post('/api/customers')
      .send({
        birth_date: new Date('23-44-1995'),
        full_name: '',
        genre: '',
        city_id: '',
      });

    const body = response.body as ValidationPropsError[];
    const expectDate = body.filter(i => i.type === 'date.base');
    const expectStrings = body.filter(i => i.type === 'string.empty');

    expect(expectDate).toHaveLength(1);
    expect(expectStrings).toHaveLength(3);

    expect(response.status).toBe(422);
    expect(body).toHaveLength(4);
  });
});
