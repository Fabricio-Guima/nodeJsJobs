import { Request, Response } from 'express'
import { Job } from '../models'

//uso include para pegar o relacionamento de fato e enviar junto do job para o front
const jobsController = {
  index: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.findAll({ include: 'company' })
      return res.json(jobs)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  save: async (req: Request, res: Response) => {
    const { title, description, limitDate, companyId } = req.body

    try {
      const job = await Job.create({
        title,
        description,
        limitDate,
        companyId,
      })

      return res.status(201).json(job)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params

    //vamos retornar os candidatos que se cadastraram na vaga
    try {
      const job = await Job.findByPk(id, { include: ['company', 'candidates'] })
      const candidatesCount = await job?.countCandidates()
      //pegar só os campos de job e nada mais job.get() e evitar erro de converter circular etc
      return res.json({ ...job?.get(), candidatesCount })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, limitDate, companyId } = req.body

    try {
      const [affectedRows, jobs] = await Job.update(
        {
          title,
          description,
          limitDate,
          companyId,
        },
        {
          where: { id },
          returning: true,
        }
      )

      return res.json(jobs[0])
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      await Job.destroy({
        where: { id: id },
      })

      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  //N para N - vincular um candidato a uma vaga
  addCandidate: async (req: Request, res: Response) => {
    const jobId = req.params.id
    const { candidateId } = req.body

    try {
      const job = await Job.findByPk(jobId)

      if (job === null)
        return res
          .status(404)
          .json({ message: 'Vaga de emprego não encontrada' })

      await job.addCandidate(candidateId)

      return res.status(201).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  //N para N - remover um candidato de uma vaga
  removeCandidate: async (req: Request, res: Response) => {
    const jobId = req.params.id
    const { candidateId } = req.body

    try {
      const job = await Job.findByPk(jobId)

      if (job === null)
        return res
          .status(404)
          .json({ message: 'Vaga de emprego não encontrada' })

      await job.removeCandidate(candidateId)

      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
}

export { jobsController }
