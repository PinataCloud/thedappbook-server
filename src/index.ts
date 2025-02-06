import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PinataSDK } from 'pinata-web3'

type Bindings = {
  PINATA_JWT: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors({
  origin: '*'
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/keys', async (c) => {
  // Auth would go here
  try {
    const pinata = new PinataSDK({
      pinataJwt: c.env.PINATA_JWT,
      pinataGateway: ""
    })
    const key = await pinata.keys.create({
      keyName: "dappbooktemp",
      permissions: {
        endpoints: {
          pinning: {
            pinFileToIPFS: true,
            pinJSONToIPFS: true
          }
        },
      },
      maxUses: 2
    })
    return c.json({ data: key.JWT }, 200)
  } catch (error) {
    console.log(error)
    return c.json({ error: error }, 500)
  }
})

export default app
