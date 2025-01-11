/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import { City } from '@prisma/client';
import 'reflect-metadata';
import request from 'supertest';
import { v4 } from 'uuid';

let city: City;

describe('RemoveCustomerController', () => {
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

  it('should be able to delete specific customer by id!', async () => {
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

    const response = await request(app).delete(`/api/customers/${customer.id}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const customerExists = await prisma.customer.findUnique({
      where: {
        id: customer.id,
      },
    });
    expect(customerExists).toBe(null);
    expect(customerExists).toBeFalsy();
  });

  it('should not be able to delete specific customer by wrong/invalid id!', async () => {
    const response = await request(app).delete(`/api/customers/${v4()}`);

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CustomerNotFoundError');
    expect(response.status).toBe(404);
  });
});
