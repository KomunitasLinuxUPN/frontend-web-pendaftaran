import Path from 'path'

import { RequestHandler } from 'express'
import ejs from 'ejs'
import nodemailer from 'nodemailer'
import mailgunTransport from 'nodemailer-mailgun-transport'

import RegConfirmBody from '@/backend/models/RegConfirmBody'

const nodemailerMailgun = nodemailer.createTransport(
  mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_KEY!,
      domain: process.env.MAILGUN_DOMAIN!,
    },
  })
)

export const confirmRegistration: RequestHandler = async (req, res) => {
  const memberEmail = (req.body as RegConfirmBody).email
  const token = (req.body as RegConfirmBody).token
  const baseURL = process.env.BASE_URL || 'http://localhost:3000'

  const emailTemplate = await ejs.renderFile(
    Path.join(__dirname, '..', '/templates/confirmation.ejs'),
    { baseURL, token }
  )

  nodemailerMailgun
    .sendMail({
      from: process.env.MAILGUN_SENDER,
      to: memberEmail,
      subject: 'Konfirmasi Pendaftaran KoLU',
      html: emailTemplate,
    })
    .then(
      (infoSended) => {
        res.status(200).json({
          message: 'Registration email sended',
          moreInfo: infoSended,
        })
      },
      (infoRejected) => {
        res.status(200).json({
          message: 'Registration email rejected!',
          moreInfo: infoRejected,
        })
      }
    )
    .catch((error) => {
      res.status(200).json({
        message: 'Registration email rejected!',
        moreInfo: error,
      })
    })
}
