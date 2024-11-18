import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';

import ApiError from '../../libraries/errors/api.error.js'
import controller from '../user.controller.js';
import { UserDatamapper } from '../../datamappers/index.datamapper.js';
import CoreDatamapper from '../../datamappers/core.datamapper.js';

jest.mock('../../libraries/errors/api.error.js');
jest.spyOn(CoreDatamapper, 'create').mockImplementation(jest.fn());
jest.spyOn(UserDatamapper, 'findOne').mockImplementation(jest.fn());
jest.spyOn(bcrypt, 'hash').mockImplementation(jest.fn());

describe('store', () => {
  // Mock request and response objects
  const mockReq = {
    body: {
      firstname: 'Harley',
      lastname: 'Quinn',
      email: 'h.quinn@teamjoker.got',
      password: 'AAaa00!!',
      city: 'Gotham City',
      phone_number: '0123456789',
      department_label: 'DC',
    }
  };

  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };
  // Mock next function
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call next() with an error if email already exists', async () => {
    // Mock findOne() results : email already exists in database
    UserDatamapper.findOne.mockResolvedValueOnce(true);

    await controller.store(mockReq, mockRes, mockNext);
    // Check if UserDatamapper.findOne() is called with correct arguments
    expect(UserDatamapper.findOne).toHaveBeenNthCalledWith(1,'email', mockReq.body.email)
    // Check next() and response behavior
    expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test('should call next() with an error if phone number already exists', async () => {
    // Mock findOne() results : email is valid but phone number already exists in sdatabase
    UserDatamapper.findOne.mockResolvedValueOnce(false);
    UserDatamapper.findOne.mockResolvedValueOnce(true);

    await controller.store(mockReq, mockRes, mockNext);
    // Check if UserDatamapper.findOne() is called with correct arguments
    expect(UserDatamapper.findOne).toHaveBeenNthCalledWith(2,'phone_number', mockReq.body.phone_number)
    // Check next() and response behavior when phone number already exists in database
    expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    expect(mockRes.status).not.toHaveBeenCalled(); 
  });

  test('should hash the password and create a new user', async () => {
    // Mock findOne() results : email and phone number are both valid
    UserDatamapper.findOne.mockResolvedValueOnce(false);
    UserDatamapper.findOne.mockResolvedValueOnce(false);
    bcrypt.hash.mockResolvedValueOnce('hashedPassword');

    await controller.store(mockReq, mockRes, mockNext);
    // Check if becrypt is called with the password to hash
    expect(bcrypt.hash).toHaveBeenCalledWith('AAaa00!!', 10); 
    // Check if create() is called with the correct object
    expect(CoreDatamapper.create).toHaveBeenCalledWith(expect.objectContaining({
      firstname: 'Harley',
      lastname: 'Quinn',
      email: 'h.quinn@teamjoker.got',
      password: 'hashedPassword',
      city: 'Gotham City',
      phone_number: '0123456789',
      department_label: 'DC',
    }));
    // Check response.status() and response.json() behavior
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'User created successfully' });
  });
});
