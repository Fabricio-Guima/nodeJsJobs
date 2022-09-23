// src/models/index.ts

import { Candidate } from './candidate'
import { Company } from './company'
import { Job } from './job'

//aqui eu falo ao sequelize que x model tem relacionamento com outro model
Company.hasMany(Job)
Job.belongsTo(Company)

export { Candidate, Company, Job }
