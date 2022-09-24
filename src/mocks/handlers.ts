import { rest } from 'msw'

export default [
  rest.post('/login', (req, res, ctx) => {
    const credentials = req.body

    if (!credentials) res(ctx.status(400))
    
    return res(
      ctx.json({
        message: 'Logged in!'
      })
    )
  })
]