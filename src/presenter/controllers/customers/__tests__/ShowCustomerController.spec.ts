/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';

import request from 'supertest';
import { v4 } from 'uuid';

import { faker } from '@faker-js/faker/.';
import { City } from '@prisma/client';

let city: City;

describe('ShowCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers = prisma.customer.deleteMany();
    const deleteAllCities = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers, deleteAllCities]);

    await prisma.$disconnect();
  });

  beforeEach(async () => {
    city = await prisma.city.create({
      data: {
        country: faker.location.country(),
        name: faker.location.city(),
      },
    });
  });

  it('should be able to find specific customer by id!', async () => {
    const customer = await prisma.customer.create({
      data: {
        birth_date: faker.date.past(),
        full_name: faker.person.fullName(),
        genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        city_id: city.id,
      },
    });

    /**
     * Test Case
     */

    const response = await request(app).get(`/api/customers/${customer.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty('id');

    expect(response.body.genre).toEqual(customer.genre);
    expect(response.body.full_name).toEqual(customer.full_name);
    expect(new Date(response.body.birth_date)).toEqual(customer.birth_date);
  });

  it('should not be able to find specific customer by wrong/invalid id!', async () => {
    const response = await request(app).get(`/api/customers/${v4()}`);

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CustomerNotFoundError');
    expect(response.status).toBe(404);
  });
});
