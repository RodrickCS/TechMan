const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const loadViewEquipamentos = async (req, res) => {
  let dados = await ler()
  res.set('Content-Type', 'text/html; charset=UTF-8')
  res.render("equipamentos", { dados })
}

const criar = async (req, res) => {
  try {
    let equip = await prisma.equipamentos.create({
      data: req.body,
    })
    res.status(201).json(equip).end()
  } catch (err) {
    res.status(500).json(err).end()
    console.log(err)
  }
}

const ler = async (req, res) => {
  try {
    let equip = await prisma.$queryRaw`SELECT * FROM equipamentos WHERE ativo = 1`
    res.status(201).json(equip).end()
    return equip
  } catch (err) {
    res.status(500).json(err).end()
  }
}

const lerComentarios = async (req, res) => {
  try {
    let equip = await prisma.$queryRaw`SELECT c.perfil AS id_user, p.perfil ,c.equipamento, c.comentario, c.data FROM comentarios c 
    INNER JOIN perfis p
    ON c.perfil = p.id
    WHERE equipamento = ${req.params.id}`
    res.status(200).json(equip).end()
  } catch (err) {
    res.status(500).json(err).end()
  }
}

const addComentario = async (req, res) => {
  try {
    let equip = await prisma.comentarios.create({
      data: {
        comentario: req.body.comentario,
        equipamento: req.body.equipamento,
        perfil: req.body.perfil,
        data: req.body.data
      },
    })
    res.status(201).json(equip).end()
  } catch (err) {
    res.status(500).json(err).end()
    console.log(err)
  }
}

const removerEquipamento = async (req, res) => {
  try {
    let equip = await prisma.equipamentos.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(204).json(equip).end()
  }catch(err){
    res.status(500).json(err).end()
    console.log(err)
  }
}

module.exports = {
  criar,
  ler,
  addComentario,
  lerComentarios,
  loadViewEquipamentos,
  removerEquipamento
}
