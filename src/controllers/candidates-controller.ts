import { Request, Response } from 'express'
import { Candidate } from '../models/candidate'

export const candidatesController = {
  index: async (req: Request, res: Response) => {
    try {
      const candidates = await Candidate.findAll()
      res.status(200).json({ candidates })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  save: async (req: Request, res: Response) => {
    const { name, bio, email, phone, openToWork } = req.body

    try {
      const candidate = await Candidate.create({
        name,
        bio,
        email,
        phone,
        openToWork,
      })

      return res.status(201).json(candidate)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const candidate = await Candidate.findByPk(id)

      if (candidate === null)
        return res.status(404).json({ message: 'Candidato não encontrado' })

      res.status(200).json({ candidate })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, bio, email, phone, openToWork } = req.body
    try {
      const candidate = await Candidate.findByPk(id)

      if (candidate === null)
        return res.status(404).json({ message: 'Candidato não encontrado' })

      //refatorar isso
      candidate.name = name
      candidate.bio = bio
      candidate.email = email
      candidate.phone = phone
      candidate.openToWork = openToWork

      await candidate.save()
      res.status(200).json({ candidate })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      await Candidate.destroy({ where: { id } })
      res.status(204).send()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
