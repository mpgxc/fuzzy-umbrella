import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

describe('LisCityController - GET cities', () => {
  afterAll(async () => {
    await prisma.city.deleteMany();
    await prisma.$disconnect();
  });

  beforeAll(async () => {
    await prisma.city.createMany({
      data: [
        {
          country: 'PI',
          name: 'Esperantina',
        },
        {
          country: 'PI',
          name: 'Morro do Chapeu',
        },
        {
          country: 'SP',
          name: 'Osasco',
        },
      ],
    });
  });

  it('should be able to list all regitered cities!', async () => {
    const response = await request(app).get(`/api/cities`);

    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(3);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          country: 'PI',
          name: 'Esperantina',
        }),

        expect.objectContaining({
          id: expect.any(String),
          country: 'PI',
          name: 'Morro do Chapeu',
        }),

        expect.objectContaining({
          id: expect.any(String),
          country: 'SP',
          name: 'Osasco',
        }),
      ]),
    );
  });

  it('should be able to list all regitered cities that match queries params /state', async () => {
    const response = await request(app).get(`/api/cities`).query({
      state: 'PI',
    });

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          country: 'PI',
          name: 'Esperantina',
        }),

        expect.objectContaining({
          id: expect.any(String),
          country: 'PI',
          name: 'Morro do Chapeu',
        }),
      ]),
    );
  });

  it('should be able to list all regitered cities that match queries params / cidade', async () => {
    const response = await request(app).get(`/api/cities`).query({
      city: 'Esperantina',
    });

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          country: 'PI',
          name: 'Esperantina',
        }),
      ]),
    );
  });
});
