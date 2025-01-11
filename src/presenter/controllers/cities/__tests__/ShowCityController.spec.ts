import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import 'reflect-metadata';
import request from 'supertest';
import { v4 } from 'uuid';

describe('ShowCityController - GET cities/:id', () => {
  afterAll(async () => {
    await prisma.city.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to find cities by id!', async () => {
    const city = await prisma.city.create({
      data: {
        country: 'SP',
        name: 'São Paulo',
      },
    });

    const response = await request(app).get(`/api/cities/${city.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();

    expect(response.body.id).toBe(city.id);
    expect(response.body.name).toBe(city.name);
    expect(response.body.country).toBe(city.country);
  });

  it('should not be able to find cities by wrong/invalid id!', async () => {
    const response = await request(app).get(`/api/cities/${v4()}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toEqual('Exception!');
    expect(response.body.name).toEqual('CityNotFoundError');
  });

  it('should not be able to find cities by invalid format id!', async () => {
    const response = await request(app).get('/api/cities/sasasasasas');

    expect(response.status).toBe(422);

    const [first] = response.body;

    expect(first.status).toEqual('Exception!');
    expect(first.type).toEqual('string.guid');
    expect(first.label).toEqual('id');
  });
});
