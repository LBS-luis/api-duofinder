import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const port = process.env.PORT || 3333;

const prisma = new PrismaClient({
  log: ['query'],
});

const app = express();

app.use(express.json());

app.use(cors());

// return games array
app.get('/', (req, res) => {
  const html = `<html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style type="text/css">
          body {
              width: 100vw;
              height: 100vh;
              background-color: #18181b;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;
          }
          h1 {            
              align-self: center;            
              font-family: Helvetica, Arial;
              color: #f4f4f5;
          }
      </style>
  </head>
  <body>
      <h1>
          Here is the <a style="color: #0ea5e9;">D</a><a style="color: #a855f7;">u</a><a style="color: #ec4899;">o</a> Finder <a style="color: #34d399;">API</a>
      </h1>
  </body>
  </html>`
  res.send(html);
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

// create ad in game
app.post('/game/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

// return ads array of a unique game
app.get('/game/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

//return a discrod in a unique ad
app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({
    discord: ad.discord,
  });
});

app.listen(port);
