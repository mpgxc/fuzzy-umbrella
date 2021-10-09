import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

type ValidationPropsError = {
  status: string;
  type: string;
  message: string;
  label: string;
};

describe('RegisterCityController - POST cities', () => {
  afterAll(async () => {
    await prisma.city.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to create news cities!', async () => {
    const response = await request(app).post('/api/cities').send({
      country: 'Piauí',
      name: 'Esperantina',
    });

    expect(response.body).toEqual('');
    expect(response.status).toBe(201);
    expect(
      await prisma.city.findFirst({
        where: {
          name: 'Esperantina',
        },
      }),
    ).toBeTruthy();
  });

  it('should not be to register duplicate cities !', async () => {
    await prisma.city.create({
      data: {
        country: 'Tocantins',
        name: 'Cidade',
      },
    });

    const response = await request(app).post('/api/cities').send({
      country: 'Tocantins',
      name: 'Cidade',
    });

    expect(response.status).toBe(409);
    expect(response.body.status).toBe('Exception!');
    expect(response.body.name).toBe('CityAlreadyExistsError');
  });

  it('should not be to register news cities with wrong body props!', async () => {
    const response = await request(app).post('/api/cities').send({});

    expect(response.status).toBe(422);

    const body = response.body as ValidationPropsError[];
    const expectStrings = body.filter(i => i.type === 'any.required');
    expect(expectStrings).toHaveLength(2);
  });

  it('should not be to register news cities with empty body props!', async () => {
    const response = await request(app).post('/api/cities').send({
      name: '',
      country: '',
    });

    expect(response.status).toBe(422);

    const body = response.body as ValidationPropsError[];
    const expectStrings = body.filter(i => i.type === 'string.empty');
    expect(expectStrings).toHaveLength(2);
  });
});
