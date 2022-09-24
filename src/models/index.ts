// src/models/index.ts

import { Candidate } from './candidate'
import { Company } from './company'
import { Job } from './job'

//aqui eu falo ao sequelize que x model tem relacionamento com outro model
Company.hasMany(Job)
Job.belongsTo(Company)

// N para N
Job.belongsToMany(Candidate, { through: 'job_candidates' })
Candidate.belongsToMany(Job, { through: 'job_candidates' })

export { Candidate, Company, Job }
