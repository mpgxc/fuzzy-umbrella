/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import { City } from '@prisma/client';
import 'reflect-metadata';
import request from 'supertest';
import { v4 } from 'uuid';

let city: City;

describe('UpdateCustomerController - PATCH customer/:id', () => {
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

  it('should be able to update specific customer name by id!', async () => {
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

    const response = await request(app)
      .patch(`/api/customers/${customer.id}`)
      .send({
        full_name: 'João das Neves',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual('');

    const customerUpdated = await prisma.customer.findUnique({
      where: {
        id: customer.id,
      },
    });

    expect(customerUpdated.full_name).toEqual('João das Neves');
  });

  it('should not be able to update specific customer name by wrong/invalid id!', async () => {
    const response = await request(app).get(`/api/customers/${v4()}`).send({
      full_name: 'Random Name',
    });

    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CustomerNotFoundError');
    expect(response.status).toBe(404);
  });

  it('should not be able to update specific customer name with wrong/invalid params!', async () => {
    const customer = await prisma.customer.create({
      data: {
        birth_date: faker.date.past(),
        full_name: faker.person.fullName(),
        genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        city_id: city.id,
      },
    });

    const response = await request(app)
      .patch(`/api/customers/${customer.id}`)
      .send({
        full_name: '',
      });

    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);

    const [first] = response.body;

    expect(first.status).toEqual('Exception!');
    expect(first.type).toEqual('string.empty');
  });

  it('should not be able to update specific customer name with body null!', async () => {
    const customer = await prisma.customer.create({
      data: {
        birth_date: faker.date.past(),
        full_name: faker.person.fullName(),
        genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        city_id: city.id,
      },
    });

    const response = await request(app)
      .patch(`/api/customers/${customer.id}`)
      .send({});

    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);

    const [first] = response.body;

    expect(first.status).toEqual('Exception!');
    expect(first.type).toEqual('any.required');
    expect(first.label).toEqual('full_name');
  });
});
