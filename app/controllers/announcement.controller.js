import { AnnouncementDatamapper } from '../datamappers/index.datamapper.js';
import { AnnouncementAnimalDatamapper } from '../datamappers/index.datamapper.js';
import ApiError from '../libraries/errors/api.error.js';

export default {

  async show(req, res, next){
    const { id } = req.params;

    // Check if user is logged
    if(!req.token){
      return next(new ApiError('Access Forbidden', { status: 403 }));
    }

    // Get announcement data if exists
    const announcement = await AnnouncementDatamapper.findByPk(id);

    if(!announcement){
      return next(new ApiError('Ressource not found', { status: 404 }));
    }

    // Response
    res.status(200).json(announcement);
  },

  async update(req, res, next){
    const { id } = req.params;

    // Check if user is logged
    if(!req.token){
      return next(new ApiError('Access Forbidden', { status: 403 }));
    }

    // Update announcement in database
    const data = req.body;
    await AnnouncementDatamapper.update(id, data);

    // Response
    res.status(200).json({message: 'Announcement updated successfully'});
  },

  //? TODO Necessité de vérifier si l'annonce existe avant de la supprimer au cas où l'id transmis par le front serait faux ?
  async delete(req, res, next){
    const { id } = req.params;

    // Check if user is logged
    if(!req.token){
      return next(new ApiError('Access Forbidden', { status: 403 }));
    }
    await AnnouncementAnimalDatamapper.delete(id);
    await AnnouncementDatamapper.delete(id);

    // Response
    res.status(200).json({ message: 'Announcement removed successfully' });
  },

  async getHighlight(_, res) {
    // Get data from database
    const randomAnnouncements = await AnnouncementDatamapper.highlight();

    // Response
    res.status(200).json(randomAnnouncements);
  },

  async searchAnnouncement(req, res){
    // Get data from query
    const data = req.query;

    // Get data from database
    const allAnnouncements = await AnnouncementDatamapper.searchAnnouncement(data);

    // Response
    res.status(200).json(allAnnouncements);
  },

  async store(req, res, next){
    // Check if user is logged
    const { id } = req.params;
    if(!req.token || req.token !== parseInt(id)){
      return next(new ApiError('Access Forbidden', { status: 403 }));
    }
    // Add new announcement in database
    const result = await AnnouncementDatamapper.create(req.body, id);

    if (!result) {
      return next(new ApiError('Ressource not found', { status: 404 }));
    }

    const animalTypes = req.body.animal;
    if(animalTypes){
      const announcementId = result.id;
      for (const animalType of animalTypes){
        await AnnouncementAnimalDatamapper.create(animalType, announcementId);
      };
    }

    // Response
    res.status(201).json({ message: 'Announcement created successfully'});
  },
};
