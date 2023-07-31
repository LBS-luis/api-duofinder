# ( GET )
## localhost:3333/games
## localhost:3333/game/gameID/ads
## localhost:3333/ads/adId/discord


# ( POST )
## localhost:3333/game/gameID/ads
## Params
{
	"name": string,
	"yearsPlaying": number,
	"discord": string,
	"weekDays": array<number>,
	"hourStart": string ("12:00"),
	"hourEnd": string ("17:00"),
	"useVoiceChannel": boolean,
}

