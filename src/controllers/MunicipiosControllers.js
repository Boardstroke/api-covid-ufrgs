const {Municipios, Location, Distancias, Infectados} = require('../models');


module.exports = {
  async index(req, res) {
    try {
      const municipios = await Municipios.findAll({
        include: [Location, Distancias, Infectados],
        order: ['id']

        });
      res.send(municipios);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  async addMunicipio(req, res) {
    try {
      const municipio = await Municipios.create(req.body);
      res.send(municipio.toJSON());
    } catch (err) {
      res.status(400).send(err);
    }
  },
  async addLocation(req,res) {
    try{
      const location = await Location.create(req.body);
      res.send(location.toJSON());
    }catch(err){
      res.status(400).send(err);
    }
  },
  async addDistancia(req,res){
    try{
      const distancia = await Distancias.create(req.body);
      res.send(distancia);
    }catch(err){
      res.status(400).send(err);
    }
  },
  async addInfectados(req,res){
    const mps_nao_listados = [];
    try{
      const cidade = await Municipios.findAll({
        where: {
          nome: req.body.cidade + ", RS, Brazil"
        }
      });

      try{
        const infectado = Infectados.create({"MunicipioId": cidade[0].dataValues.id, "numero_infectados":req.body.numero_infectados, "numero_obitos":req.body.numero_obitos, "data": req.body.data});
        res.status(200).send(infectado);
      }catch(err){
        console.log(err);
        res.status(400).send(err);
      }
    }catch(err){
      console.log(err, "Cidade não encontrada");

      res.status(400).send(mps_nao_listados);
    }
  },

  async deleteAll(req,res){
    try{
      const deleteAll = await Municipios.Destroy({where:{
        nome: nome
      }});
      res.send(deleteAll);
    }catch(err){
      res.send(err);
    }
  }
};