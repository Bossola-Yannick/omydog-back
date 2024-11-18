jest.unstable_mockModule('../../config/pg.client.js', () => {
  const mockedClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };

  return {
    getClient: jest.fn(() => mockedClient),
  };
});



import { jest } from '@jest/globals';
const announcementsController = (await import( '../announcement.controller.js')).default;
const { getClient } = await import ( '../../config/pg.client.js');
const  AnnouncementDatamapper =  '../../datamappers/announcement.datamapper.js';

// Mocker AnnouncementDatamapper avant de l'importer
jest.mock('../../datamappers/announcement.datamapper.js', () => ({
  create: jest.fn(),
  addAuthorizedAnimals: jest.fn(),
}));

describe('Announcement datamapper', () => {
  let client;

  beforeAll( () => {
    client = getClient();
    console.log(client);
  });

  test('announcement controller getHighlight should call res.json method with an array of objects', async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => { return mockRes; }),
      json: jest.fn(() => { return mockRes; }),
    };
      // Mock de la réponse de la requête SQL
    client.query = () => ({ rows: [
      {
        "announcement_id": 13,
        "date_start": "2024-01-13T00:00:00.000Z",
        "date_end": "2024-01-29T00:00:00.000Z",
        "mobility": true,
        "home": false,
        "description": "Veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "user_id": 13,
        "firstname": "Vincent",
        "lastname": "Michel",
        "city": "Saint-Étienne",
        "animal_label": [
          "Hamster",
          "Cochon d’Inde",
        ],
      }],
    });

    await announcementsController.getHighlight(mockReq, mockRes);

    // Je fournis moi-même les deux objets et la fonction next, qui sont normalement censés être envoyés par Express à travers le router
    expect(mockRes.json).toHaveBeenCalledWith([
      {
        "announcement_id": 13,
        "date_start": "2024-01-13T00:00:00.000Z",
        "date_end": "2024-01-29T00:00:00.000Z",
        "mobility": true,
        "home": false,
        "description": "Veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "user_id": 13,
        "firstname": "Vincent",
        "lastname": "Michel",
        "city": "Saint-Étienne",
        "animal_label": [
          "Hamster",
          "Cochon d’Inde",
        ],
      }]);
  });


  // TODO => Complete another test

  test('Store Method' , async () => {
    jest.mock('../../datamappers/index.datamapper.js');

    const mockReq = {
      params : {
        id: "2",
      },
      token : 2,
      body : {
        date_start: '2025-01-01',
        date_end: '2025-12-12',
        home: true,
        mobility: true,
        description: 'Ceci est un test',
        user_id: 4,
        animal: ['Chien'],
      },
    };
    const mockRes = {
      status: jest.fn(() => { return mockRes; }),
      json: jest.fn(() => { return mockRes; }),
    };

    AnnouncementDatamapper.create.mockResolvedValueOnce({ id: 1 });
    AnnouncementDatamapper.addAuthorizedAnimals.mockResolvedValueOnce({});

    // // Mock de la méthode create de l'AnnouncementDatamapper
    // const mockCreatedAnnouncement = {
    // id: 1, // Id simulé
    // date_start: mockReq.body.date_start,
    // date_end: mockReq.body.date_end,
    // mobility: mockReq.body.mobility,
    // home: mockReq.body.home,
    // description: mockReq.body.description,
    // };
    // AnnouncementDatamapper.create  = jest.fn().mockResolvedValue({ rows: [mockCreatedAnnouncement] });


    const result = await announcementsController.store(mockReq, mockRes);
    console.log(result);
    expect(AnnouncementDatamapper.create).toHaveBeenCalledWith(mockReq.body, '2');
    expect(AnnouncementDatamapper.addAuthorizedAnimals).toHaveBeenCalledWith(1, 'Chien');
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Announcement created successfully' });
  });

});
